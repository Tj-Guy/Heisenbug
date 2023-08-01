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
          <h-radio label= 1>个人</h-radio>
          <h-radio label= 2>企业</h-radio>
        </h-radio-group>
      </h-form-item>

      <!-- 根据用户类型显示问题与选项 -->
      <div v-if= "formItem1.cType == 1">
      <h-form-item label="姓名" prop="cName" required>
        <h-input v-model="formItem1.cName" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="个人证件类型" prop="cIdType" required>
        <h-select v-model="formItem1.cIdType" filterable> 
          <h-option value= 1>中华人民共和国居民身份证</h-option>
          <h-option value= 2>台湾居民来往大陆通行证</h-option>
          <h-option value= 3>港澳居民来往内地通行证</h-option>
          <h-option value= 4>外国人永久居留身份证</h-option>
        </h-select>
      </h-form-item>
      </div>

      <div v-else>
        <h-form-item label="企业名称" prop="cName" required>
          <h-input v-model="formItem1.cName" placeholder="请输入"></h-input>
        </h-form-item>
        <h-form-item label="企业证件类型" prop="cIdType" required>
          <h-select v-model="formItem1.cIdType" filterable>
            <h-option value= 5>税务登记证</h-option>
            <h-option value= 6>中华人民共和国组织机构代码证</h-option>
            <h-option value= 7>营业执照</h-option>         
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
              <h-datePicker
                type="date"
                placeholder="选择结束日期"
                v-model="formItem1.validDateTo"
              ></h-datePicker>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form-item>

      <h-form-item label="风险等级" prop="cRiskLevel" required>
        <h-radio-group v-model="formItem1.cRiskLevel">
          <h-radio label= 1>低风险</h-radio>
          <h-radio label= 2>中风险</h-radio>
          <h-radio label= 3>高风险</h-radio>
        </h-radio-group>
      </h-form-item>

      <h-form-item label="电话" prop="cTel" required>
        <h-typefield  type="money" integerNum=11 notFormat v-model="formItem1.cTel">
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

      <h-form-item>
        <!-- 文件导入 -->
        <FileUpdate/>
      </h-form-item>
    </h-form>
  </div>
</template>

<script>
import axios from 'axios'
import { newUserInfo } from '../../../api/UserManage'
import { codeResult } from '../../../utils/tools'

export default {
  components:{
    FileUpdate: () => import(/* webpackChunkName: "components/FileUpdate" */ "@/components/FileUpdate")
  },
  data() {
    return {
      model1: "",
      changeform: false,
      formItem1: {
        //四要素
        cType: 1,
        cName: "",
        cId: "",
        cIdType: null,
        //剩余detail
        cRiskLevel: null,
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
    formSubmit() {
      newUserInfo({
        c_ID_type: this.formItem1.cIdType,
        c_ID: this.formItem1.cId,
        c_type: this.formItem1.cType,
        c_name: this.formItem1.cName,
        c_risk_level: this.formItem1.cRiskLevel,
      }).then(res =>{
        console.log(res);
        if(res.data.resultCode == 1 || res.data.resultCode == 2){
          this.handleReset('formItem1');
          this.$hMessage.success("提交成功!");
        }
        else
          this.$hMessage.error(codeResult(res.data.data.resultCode))
      }); 
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.formSubmit();
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
  },
};
</script>