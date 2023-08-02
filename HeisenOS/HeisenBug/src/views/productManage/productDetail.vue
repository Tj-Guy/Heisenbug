<!-- 查看产品详情信息 可直接修改，修改后点提交，提示修改了哪些信息，是否确定提交；还有一键删除该产品的button -->
<template>
  <div>
    <h-form
      ref="formData"
      :model="formData"
      :label-width="100"
      errorFocus
      cols="1"
    >
      <h-form-item label="基金代码" prop="jijindaima" required>
        <h-input v-model="formData.jijindaima" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="基金名称" prop="jijinmingcheng" required>
        <h-input
          v-model="formData.jijinmingcheng"
          type="text"
          placeholder="请输入..."
        ></h-input>
      </h-form-item>
      <h-form-item label="基金规模" prop="jijinguimo" required>
        <h-typefield v-model="formData.jijinguimo">
          <h-select
            v-model="select2"
            placeholder=""
            slot="append"
            style="width: 45px"
            :isArrow="false"
            :clearable="false"
            :tranfer="true"
          >
            <h-option value="wan">万</h-option>
          </h-select>
        </h-typefield>
      </h-form-item>
      <h-form-item label="基金经理" prop="jijinjingli" required>
        <h-input
          v-model="formData.jijinjingli"
          type="text"
          placeholder="请输入..."
        ></h-input>
      </h-form-item>
      <h-form-item label="所属公司" prop="suoshugongsi" required>
        <h-input
          v-model="formData.suoshugongsi"
          type="text"
          placeholder="请输入..."
        ></h-input>
      </h-form-item>
      <h-form-item label="风险等级" prop="jijinpingji" required>
        <h-select v-model="formData.jijinpingji" filterable>
          <h-option value="低">低</h-option>
          <h-option value="中">中</h-option>
          <h-option value="高">高</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="基金成立日" prop="chengliriqi">
        <h-form-item>
          <h-datePicker
            type="date"
            placeholder="选择日期"
            v-model="formData.chengliriqi"
            format="yyyy-MM-dd" showFormat
          ></h-datePicker>
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
        <h-input
          v-model="formData.jibengaikuang"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 7 }"
          placeholder="请输入..."
        ></h-input>
      </h-form-item>
      <h-form-item>
        <Button type="primary" @click="submitUpdate">提交修改</Button>
        <Button type="primary" @click="cancelUpdate">取消</Button>
        <Button type="primary" @click="submitDelete">删除产品</Button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { updateProduct } from "../../api/ProductManage";
import { deleteProduct } from "../../api/ProductManage";
import { codeResult } from "../../utils/tools";
console.log(mapGetters, 1111)
export default {
  data() {
    return {
      changeform: false,
      formData: {
        jijindaima: '',
        jijinmingcheng: '',
        mujifangshi: '',
        touzilinian: '',
        touziduixiang: '',
        jiaoyifangshi: '',
        jijinguimo: '',
        jijinpingji: "",
        suoshugongsi: '',
        jijinjingli: '',
        jibengaikuang: '',
        chengliriqi: '',
      },
      select2: "",
      //   stringRule:['email'],
      //   regRule: [{test:/^[a-zA-Z]+$/, message:'不全是字母',trigger:'blur'}],
      risk_level: null,
    };
  },
  computed: {
    ...mapGetters('product', { productDetail: "productDetail" }),
  },
  watch: {
    risk_level() {
      const mapping = {
        1: "低",
        2: "中",
        3: "高",
      };
      // Return the corresponding value of 'y' based on the mapping.
      this.formData.jijinpingji = mapping[this.risk_level] || '';
    },
    productDetail: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = {
            jijindaima: val.fId,
            jijinmingcheng: val.fName,
            mujifangshi: val.fType && val.fType.slice(0, 2),
            touzilinian: val.fType && val.fType.slice(2, 5),
            touziduixiang: val.fType && val.fType.slice(5, 8),
            jiaoyifangshi: val.fType && val.fType.slice(8, 12),
            jijinguimo: val.fSize,
            jijinpingji: "",
            suoshugongsi: val.fCompany,
            jijinjingli: val.fMonitor,
            jibengaikuang: val.fOverview,
            chengliriqi: val.fStartTime,
          };
          this.risk_level = val.fRiskLevel;
        }
      },
    },
  },
  methods: {
    submitUpdate() {
      let jiJingGuiMo = this.formData.jijinguimo
      jiJingGuiMo = [null, undefined].includes(jiJingGuiMo) ?  null : Number(jiJingGuiMo)
      jiJingGuiMo = isNaN(jiJingGuiMo) ? null : jiJingGuiMo
      updateProduct({
        f_id: this.formData.jijindaima,
        f_name: this.formData.jijinmingcheng,
        f_type: `${this.formData.mujifangshi}${this.formData.touzilinian}${this.formData.touziduixiang}${this.formData.jiaoyifangshi}`,
        f_size: jiJingGuiMo,
        f_monitor: this.formData.jijinjingli,
        f_start_time: this.formData.chengliriqi,
        f_company: this.formData.suoshugongsi,
        f_risk_level: this.risk_level,
        f_overview: this.formData.jibengaikuang,
      }).then((res) => {
        console.log(res);
        if (res.data.resultCode == 2) {
          this.$hMessage.success("修改提交成功!");
          this.$hCore.navigate("productManage/productIndex");
        } else this.$hMessage.error(codeResult(res.data.resultCode));
      });
    },
    cancelUpdate() {
      this.$hCore.navigate("productManage/productIndex");
    },
    submitDelete() {
      deleteProduct({
        f_id: this.formData.jijindaima,
      }).then((res) => {
        console.log(res);
        if (res.data.resultCode == -103) {
          this.$hMessage.success("删除提交成功!");
          this.$hCore.navigate("/productManage/productIndex");
        } else this.$hMessage.error(codeResult(res.data.resultCode));
      });
    },
  },
};
</script>
