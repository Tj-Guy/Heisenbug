
<template>
  <div>
    <h-form ref="formData" :model="formData" :label-width="100" errorFocus cols="1">
      <h-form-item label="基金代码" prop="jijindaima" required>
        <h-input v-model="formData.jijindaima" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="基金名称" prop="jijinmingcheng" required>
        <h-input v-model="formData.jijinmingcheng" type="text" placeholder="请输入..."></h-input>
      </h-form-item>
      <h-form-item label="基金规模" prop="jijinguimo" required>
        <h-typefield v-model="formData.jijinguimo">
          <h-select v-model="select2" placeholder="" slot="append" style="width: 45px" :isArrow="false" :clearable="false"
            :tranfer="true">
            <h-option value="wan">万</h-option>
          </h-select>
        </h-typefield>
      </h-form-item>
      <h-form-item label="基金经理" prop="jijinjingli" required>
        <h-input v-model="formData.jijinjingli" type="text" placeholder="请输入..."></h-input>
      </h-form-item>
      <h-form-item label="所属公司" prop="suoshugongsi" required>
        <h-input v-model="formData.suoshugongsi" type="text" placeholder="请输入..."></h-input>
      </h-form-item>
      <h-form-item label="风险等级" prop="jijinpingji" required>
        <h-select v-model="formData.jijinpingji" filterable>
          <h-option value="di">低</h-option>
          <h-option value="zhong">中</h-option>
          <h-option value="gao">高</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="基金成立日" prop="chengliriqi">
        <h-form-item>
          <h-datePicker type="date" placeholder="选择日期" v-model="formData.chengliriqi" format="yyyy-MM-dd" showFormat></h-datePicker>
        </h-form-item>
      </h-form-item>
      <h-form-item label="投资对象" prop="touziduixiang">
        <h-select v-model="formData.touziduixiang" filterable>
          <h-option value="股票型">股票型</h-option>
          <h-option value="债券型">债券型</h-option>
          <h-option value="货币型">货币型</h-option>
          <h-option value="混合型">混合型</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="募集方式" prop="mujifangshi">
        <h-radio-group v-model="formData.mujifangshi">
          <h-radio label="公募">公募</h-radio>
          <h-radio label="私募">私募</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="投资理念" prop="touzilinian">
        <h-radio-group v-model="formData.touzilinian">
          <h-radio label="主动型">主动型</h-radio>
          <h-radio label="被动型">被动型</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="交易方式" prop="jiaoyifangshi">
        <h-radio-group v-model="formData.jiaoyifangshi">
          <h-radio label="场内基金">场内基金</h-radio>
          <h-radio label="场外基金">场外基金</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="基本概况" prop="jibengaikuang">
        <h-input v-model="formData.jibengaikuang" type="textarea" :autosize="{ minRows: 1, maxRows: 7 }"
          placeholder="请输入..."></h-input>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formData')">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px;" @click="handleReset('formData')">重置/取消</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>

import { submitProduct } from '../../api/ProductManage'
import { codeResult } from '../../utils/tools'


export default {
  data() {
    return {
      
      stringRule: ["email"],
      regRule: [
        { test: /^[a-zA-Z]+$/, message: "不全是字母", trigger: "blur" },
      ],
      changeform: false,
      formData: {
        jijindaima: '123',
        jijinmingcheng: '123',
        jijinguimo: 0,
        mujifangshi: '',
        touzilinian: '',
        touziduixiang: '',
        jiaoyifangshi: '',
        jijinpingji: '',
        suoshugongsi: '',
        jijinjingli: '',
        jibengaikuang: '',
        chengliriqi: '',
      },
      select2: '',
      //   stringRule:['email'],
      //   regRule: [{test:/^[a-zA-Z]+$/, message:'不全是字母',trigger:'blur'}],
      risk_level: 0,
    }
  },
  watch: {
    'formData.jijinpingji'() {
        const mapping = {
          'di': 1,
          'zhong': 2,
          'gao': 3
        }

        // Return the corresponding value of 'y' based on the mapping.
        this.risk_level = mapping[this.formData.jijinpingji];
      },
      
  },
  methods:{
    rowClick(e) {
      console.log(e)
    },

    productSubmit(){
      let jiJingGuiMo = this.formData.jijinguimo
      jiJingGuiMo = [null, undefined].includes(jiJingGuiMo) ?  null : Number(jiJingGuiMo)
      jiJingGuiMo = isNaN(jiJingGuiMo) ? null : jiJingGuiMo
      submitProduct({
        f_id: this.formData.jijindaima,
        f_name: this.formData.jijinmingcheng,
        f_type: `${this.formData.mujifangshi}${this.formData.touzilinian}${this.formData.touziduixiang}${this.formData.jiaoyifangshi}`,
        f_size: jiJingGuiMo,
        f_monitor: this.formData.jijinjingli,
        f_start_time: this.formData.chengliriqi,
        f_company: this.formData.suoshugongsi,
        f_risk_level: this.risk_level,
        f_overview: this.formData.jibengaikuang,
      }).then(res =>{
        console.log(res);
        if(res.data.resultCode == 1 ){
          this.handleReset('formData');
          this.$hMessage.success("产品创建成功!");
        }
        else
          this.$hMessage.error(codeResult(res.data.resultCode))
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.productSubmit();
        } else {
          this.$hMessage.error("表单验证失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    totest() {
      this.$refs.changeDrop.focus();
    },
  }
}
</script>