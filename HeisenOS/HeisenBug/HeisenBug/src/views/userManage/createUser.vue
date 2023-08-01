<!--开户 -->
<template>
  <div>
    <h-form
      ref="formItem1"
      :model="formItem1"
      :label-width="100"
      errorFocus
      cols="1"
    >
      <h-form-item label="用户类型" prop="cType" required>
        <h-radio-group v-model="formItem1.cType">
          <h-radio label='1'>个人</h-radio>
          <h-radio label='2'>企业</h-radio>
        </h-radio-group>
      </h-form-item>

      <!-- 根据用户类型显示问题与选项 -->
      <div v-if= "formItem1.cType === '1'">
      <h-form-item label="姓名" prop="cName" required>
        <h-input v-model="formItem1.cName" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="个人证件类型" prop="cIdType" required>
        <h-select v-model="formItem1.cIdType" filterable> 
          <h-option value="1">中华人民共和国居民身份证</h-option>
          <h-option value="2">台湾居民来往大陆通行证</h-option>
          <h-option value="3">港澳居民来往内地通行证</h-option>
          <h-option value="4">外国人永久居留身份证</h-option>
        </h-select>
      </h-form-item>
      </div>

      <div v-else>
        <h-form-item label="企业名称" prop="cName" required>
          <h-input v-model="formItem1.cName" placeholder="请输入"></h-input>
        </h-form-item>
        <h-form-item label="企业证件类型" prop="cIdType" required>
          <h-select v-model="formItem1.cIdType" filterable>
            <h-option value="5">税务登记证</h-option>
            <h-option value="6">中华人民共和国组织机构代码证</h-option>
            <h-option value="7">营业执照</h-option>         
        </h-select>
      </h-form-item>
      </div>

      <!-- 统一问题 -->
      <h-form-item label="证件号" prop="cId" required>
        <h-input v-model="formItem1.cId" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="证件有效期">
        <h-row>
          <h-col span="11">
            <h-form-item prop="validDateFrom">
              <h-datePicker
                type="date"
                placeholder="选择起始日期"
                v-model="formItem1.validDateFrom"
              ></h-datePicker>
            </h-form-item>
          </h-col>
          <h-col span="2" style="text-align: center;">-</h-col>
          <h-col span="11">
            <h-form-item prop="validDateTo">
              <h-timePicker
                type="date"
                placeholder="选择结束日期"
                v-model="formItem1.validDateTo"
              ></h-timePicker>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form-item>

      <h-form-item label="风险等级" prop="cRiskLevel" required>
        <h-radio-group v-model="formItem1.cRiskLevel">
          <h-radio label='1'>低风险</h-radio>
          <h-radio label='2'>中风险</h-radio>
          <h-radio label='3'>高风险</h-radio>
        </h-radio-group>
      </h-form-item>

      <h-form-item label="电话" prop="cTel" required>
        <h-typefield v-model="formItem1.cTel">
        </h-typefield>
      </h-form-item>
      <h-form-item label="邮箱" prop="cEmail">
        <h-input v-model="formItem1.cEmail" placeholder="请输入"></h-input>
      </h-form-item>

      <h-form-item label="省市区" prop="cascader" required>
        <h-cascader
          v-model="formItem1.cascader"
          :data="data2"
          trigger="hover"
          style="width: 200px;"
        ></h-cascader>
      </h-form-item>
      <h-form-item label="详细地址" prop="cAddress" required>
        <h-input
          v-model="formItem1.cAddress"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入..."
        ></h-input>
      </h-form-item>
      
      <!-- 提交与重置取消按钮 -->
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formItem1')">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px;" @click="handleReset('formItem1')">重置/取消</h-button>
      </h-form-item>
    </h-form>

      <!-- <h-form-item label="多选框" prop="checkbox" required>
        <h-checkbox-group v-model="formItem1.checkbox">
          <h-checkbox label="吃饭"></h-checkbox>
          <h-checkbox label="睡觉"></h-checkbox>
          <h-checkbox label="跑步"></h-checkbox>
          <h-checkbox label="看电影"></h-checkbox>
        </h-checkbox-group>
      </h-form-item> -->

      <!-- <h-form-item label="特殊日期" prop="fatdate" required>
        <h-fast-date v-model="formItem1.fatdate"></h-fast-date>
      </h-form-item>
      <h-form-item label="特殊日期" prop="fatdate" required>
        <h-fast-date v-model="formItem1.fatdate"></h-fast-date>
      </h-form-item>
      <h-form-item label="特殊日期" prop="fatdate" required>
        <h-fast-date v-model="formItem1.fatdate"></h-fast-date>
      </h-form-item> -->

      <!-- <h-form-item label="下拉表" prop="slider" required>
        <h-select-table v-model="formItem1.slider">
          <h-table-option
            border
            :columns="columns1"
            :data="data1"
          ></h-table-option>
        </h-select-table>
      </h-form-item>
      <h-form-item label="下拉树" prop="tree" required>
        <h-select-tree
          v-model="formItem1.tree"
          :first-value="firstValc"
          style="width: 200px;"
          :data="baseData1"
          placement="top"
          placeholder="你好"
        ></h-select-tree>
      </h-form-item> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      model1: "",
      changeform: false,
      formItem1: {
        //四要素
        cType: '',
        cName: "",
        cId: "",
        cIdType: "",
        //剩余detail
        cRiskLevel: "",
        validDateFrom: "",
        validDateTo: "",
        cTel: "",
        cEmail:"",
        cAddress: "",
        cascader: [],
      },
      formValid: {
        user: "你好",
        stringInput: "",
        password: "",
        test1: "",
        test2: "",
      },
      select1: "",
      select2: "",
      stringRule: ["email"],
      regRule: [
        { test: /^[a-zA-Z]+$/, message: "不全是字母", trigger: "blur" },
      ],
      columns1: [
        {
          title: "姓名",
          key: "name",
          ellipsis: true,
        },
        {
          title: "年龄",
          key: "age",
          hiddenCol: true,
        },
        {
          title: "地址",
          key: "address",
        },
      ],
      // data1: [
      //   {
      //     name: "王小明",
      //     age: 18,
      //     address: "北京市朝阳区芍药居",
      //     // _highlight: true//默认选择当前项
      //   },
      //   {
      //     name: "张小刚",
      //     age: 25,
      //     address: "北京市海淀区西二旗",
      //   },
      //   {
      //     name: "李小红",
      //     age: 30,
      //     address: "上海市浦东新区世纪大道",
      //   },
      //   {
      //     name: "周小伟",
      //     age: 26,
      //     address: "深圳市南山区深南大道",
      //   },
      // ],
      // baseData1: [
      //   {
      //     title: "地区",
      //     id: "1-0",
      //     children: [
      //       {
      //         title: "child1",
      //         id: "1-1",
      //         children: [
      //           {
      //             title: "child1-1-1",
      //             id: "1-1-1",
      //           },
      //           {
      //             title: "child1-1-2",
      //             id: "1-1-2",
      //           },
      //         ],
      //       },
      //       {
      //         title: "child2",
      //         id: "1-2",
      //         children: [],
      //       },
      //     ],
      //   },
      // ],
            data2: [
        {
          value: "beijing",
          label: "北京市",
          children: [
            {
              value: "chaoyang",
              label: "朝阳区",
            },
            {
              value: "dongcheng",
              label: "东城区",
            },
            {
              value: "haidian",
              label: "海淀区",
            },
            {
              value: "xicheng",
              label: "西城区",
            },
          ],
        },
        {
          value: "shanghai",
          label: "上海市",
          children: [
            {
              value: "hongkou",
              label: "虹口区",
            },
            {
              value: "jiading",
              label: "嘉定区",
            },
            {
              value: "jingan",
              label: "静安区",
            },
            {
              value: "putuo",
              label: "普陀区"
            },
            {
              value: "yangpu",
              label: "杨浦区",
            },
          ],
        },
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区",
                },
              ],
            },
            {
              value: "shenzhen",
              label: "深圳市",
              children: [
                {
                  value: "futian",
                  label: "福田区",
                },
              ],
            },
            {
              value: "zhuhai",
              label: "珠海市",
              children: [
                {
                  value: "hengqin",
                  label: "横琴区",
                },
              ],
            },
            {
              value: "foshan",
              label: "佛山市",
              children: [
                {
                  value: "chancheng",
                  label: "禅城区",
                },
                {
                  value: "gaoming",
                  label: "高明区",
                },
                {
                  value: "nanhai",
                  label: "南海区",
                },
                {
                  value: "sanshui",
                  label: "三水区",
                },
                {
                  value: "shunde",
                  label: "顺德区",
                },
              ],
            },
          ],
        },
      ],
      firstValc: "地区",
    };
  },
  methods: {
    changeform1() {
      this.changeform = !this.changeform;
    },
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$hMessage.success("提交成功!");
        } else {
          _this.$hMessage.error("表单验证失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    totest() {
      this.$refs.changeDrop.focus();
    },
  },
};
</script>