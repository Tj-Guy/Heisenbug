import hCore, { hCoreReference, triggerFrame } from '@hsui/core';

/**
 * 事件接口
 *  ## 应用内
 *   - app-ready      - 应用初始化，准备就绪
 *   - app-resume     - 应用重新进入激活状态
 *   - app-mount      - 应用挂载完成
 *   - app-unmount    - 应用卸载完成
 *  ## 跨应用
 *   - app-page-ready - 路由跳转完成，页面准备就绪
 *   - app-page-error - 路由跳转失败，页面打开报错
 *
 * 静态属性接口
 *  - isRunningInBackgroundWithAppCache - 开启应用缓存的情况下，标识应用是否进入后台运行
 */

const defaultOpts = {
  // required opts
  Vue: null,
  appOptions: null,
  template: null,
  destroyRootInstanceWhen: null, // modify destroy timing programmatically
  destroyRootInstanceAtUnmount: true // destroy instance at unmount
};

// 通过 app-start 获取启动回调
let appStartCallback = () => {};
const appStartedDeferred = new Promise((resolve) => {
  hCore.on('app-start', (cb) => {
    appStartCallback = cb;
    resolve();
  });
});

// 首次挂载
let firstMount = true;

export default function singleSpaVue(userOpts) {
  if (typeof userOpts !== 'object') {
    throw new Error(`single-spa-vue requires a configuration object`);
  }

  const opts = {
    ...defaultOpts,
    ...userOpts
  };

  if (!opts.Vue) {
    throw new Error('single-spa-vuejs must be passed opts.Vue');
  }

  if (!opts.appOptions) {
    throw new Error('single-spa-vuejs must be passed opts.appOptions');
  }

  if (opts.appOptions.hasOwnProperty('destroyRootInstanceWhen')) {
    opts.destroyRootInstanceWhen = opts.appOptions.destroyRootInstanceWhen;
  }

  if (opts.appOptions.hasOwnProperty('destroyRootInstanceAtUnmount')) {
    opts.destroyRootInstanceAtUnmount = opts.appOptions.destroyRootInstanceAtUnmount;
  }

  // Just a shared object to store the mounted object state
  let mountedInstances = {};

  return {
    bootstrap: bootstrap.bind(null, opts, mountedInstances),
    mount: mount.bind(null, opts, mountedInstances),
    unmount: unmount.bind(null, opts, mountedInstances),
    update: update.bind(null, opts, mountedInstances)
  };
}

function bootstrap(opts) {
  hCore.log.debug(`${process.env.HUI_APP_NAME || ''} 执行初始化生命周期`);
  if (opts.loadRootComponent) {
    return opts.loadRootComponent().then((root) => (opts.rootComponent = root));
  } else {
    return Promise.resolve();
  }
}

async function mount(opts, mountedInstances, props) {
  hCore.log.debug(`${process.env.HUI_APP_NAME || ''} 执行挂载生命周期`);
  // TODO - 这段儿逻辑特别乱，需要考虑优化 xiagj34323@hundsun.com
  // app resume
  if (mountedInstances.instance) {
    return Promise.resolve().then(() => {
      const { instance } = mountedInstances;
      let { el, router } = opts.appOptions;

      // Replace DOM element
      instance.$mount();
      el = document.querySelector(el);
      let path;
      if (router) {
        path =
          router.mode === 'history'
            ? window.location.pathname
            : router.mode === 'hash' && window.location.hash.slice(1);
        const { base } = router.options;
        if (router.mode === 'history' && base) {
          path = path.slice(base.length);
          path = path.startsWith('/') ? path : `/${path}`;
        }
        // 地址栏 url 拼接有参数时，去除参数
        const pathname = path.indexOf('?') !== -1 ? path.slice(0, path.indexOf('?')) : path;
        // 新打开页面和上一次应用卸载时展示页面不同，防止闪现上一次打开页面的情况需要先隐藏页面直到路由改变
        if (pathname !== router.currentRoute.path) {
          el.parentNode.style.visibility = 'hidden';
          let unwatchroute = instance.$watch('$route', (val) => {
            instance.$nextTick(() => {
              instance.$el.parentNode.style.visibility = 'visible';
              unwatchroute();
            });
          });
        } else {
          // 应用重新激活的时候，当前路由并没有变化，直接触发 app-page-ready
          triggerFrame('app-page-ready', router.currentRoute);
        }
      }
      el.parentNode.replaceChild(instance.$el, el);

      // isRunningInBackgroundWithAppCache
      mountedInstances.instance.$hCore.isRunningInBackgroundWithAppCache = false;

      // Trigger app resume
      hCore.trigger('app-resume', instance);

      // 单文件应用的场景下，app-resume 之后即可直接触发 app-page-ready
      !router && triggerFrame('app-page-ready');

      // Navigate
      instance.$nextTick(() => {
        if (router) {
          const { location } = router.resolve(path);

          if (instance.$hCore) {
            instance.$hCore.navigate(location.path, location.query);
          } else {
            router.push(location);
          }

          instance.$nextTick(() => {
            hCore.trigger('app-mount');
          });
        }
      });
    });
  }

  // app start defer
  await appStartedDeferred;

  await new Promise((resolve) => {
    const appStart = () => {
      const appOptions = { ...opts.appOptions };
      if (props.domElement && !appOptions.el) {
        appOptions.el = props.domElement;
      }

      if (!appOptions.el) {
        throw new Error('single-spa-vuejs must be passed appOptions.el');
      }

      if (!appOptions.render && !appOptions.template && opts.rootComponent) {
        appOptions.render = (h) => h(opts.rootComponent);
      }

      if (!appOptions.data) {
        appOptions.data = {};
      }

      appOptions.data = { ...appOptions.data, ...props };

      // app-page-ready && app-page-error on firstMount
      if (appOptions.router && firstMount) {
        appOptions.router.afterEach((to, from) => triggerFrame('app-page-ready', to));
        appOptions.router.onError((err) => triggerFrame('app-page-error', err));
      }

      mountedInstances.instance = new opts.Vue(appOptions);
      mountedInstances.instance.$hCore.isRunningInBackgroundWithAppCache = false;
      if (mountedInstances.instance.bind) {
        mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance);
      }

      return mountedInstances.instance;
    };

    hCoreReference.root = appStart();
    hCoreReference.root.$nextTick(() => {
      resolve();
      hCore.trigger('app-ready', hCoreReference.root);
      // 单文件应用的场景下不依赖导航守卫，app-ready === app-page-ready
      !opts.appOptions.router && triggerFrame('app-page-ready');
      appStartCallback && appStartCallback(hCoreReference.root);
    });
  });
}

function update(opts, mountedInstances, props) {
  hCore.log.debug(`${process.env.HUI_APP_NAME || ''} 执行更新生命周期`);
  return Promise.resolve().then(() => {
    const data = {
      ...(opts.appOptions.data || {}),
      ...props
    };
    for (let prop in data) {
      mountedInstances.instance[prop] = data[prop];
    }
  });
}

function unmount(opts, mountedInstances) {
  hCore.log.debug(`${process.env.HUI_APP_NAME || ''} 执行卸载生命周期`);
  hCore.trigger('app-before-unmount');
  return Promise.resolve().then(() => {
    firstMount = false;

    const shouldDestroy = opts.destroyRootInstanceWhen
      ? opts.destroyRootInstanceWhen()
      : opts.destroyRootInstanceAtUnmount;

    if (shouldDestroy) {
      mountedInstances.instance.$destroy();
      mountedInstances.instance.$el.innerHTML = '';
      delete mountedInstances.instance;

      if (mountedInstances.domEl) {
        mountedInstances.domEl.innerHTML = '';
        delete mountedInstances.domEl;
      }
    } else {
      hCore.trigger('app-unmount');
      mountedInstances.instance.$hCore.isRunningInBackgroundWithAppCache = true;
    }
  });
}
