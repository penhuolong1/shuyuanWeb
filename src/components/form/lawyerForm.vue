<!-- 代理人表单组件 -->
<template>
  <div>
    <!-- 详情部分 -->
    <div
      class="form-table"
      v-if="!isEdit&&formData"
    >
      <div class="item item-key border-right">代理人</div>
      <div class="item item-value border-right">
        <span>{{formData.typeChar}}</span>
      </div>
      <div class="item item-key border-right">委托人</div>
      <div class="item item-value">
        <span>{{formData.mandatorName}}</span>
      </div>
      <div class="item item-key border-right">姓名</div>
      <div class="item item-value border-right">
        <span>{{formData.name}}</span>
      </div>
      <div class="item item-key border-right">民族</div>
      <div class="item item-value">
        <span>{{formData.nation}}</span>
      </div>
      <div class="item item-key border-right">性别</div>
      <div class="item item-value border-right">
        <span>{{formData.sex}}</span>
      </div>
      <div class="item item-key border-right">年龄</div>
      <div class="item item-value">
        <span>{{formData.years}}</span>
      </div>
      <div class="item item-key">联系方式</div>
      <div class="item item-key item-style1">
        <span>{{formData.agentMobile}}</span>
      </div>
      <div class="item item-value">身份证号</div>
      <div class="item item-value item-style2">
        <span>{{formData.identityCard}}</span>
      </div>
      <div class="item item-key">住址</div>
      <div class="item item-key item-style3">
        <span>{{formData.address}}</span>
      </div>
      <div class="item item-value">工作单位/职务</div>
      <div class="item item-value item-style4">
        <span>{{formData.unitInfo}}</span>
      </div>
      <div class="item item-key">律师证件号</div>
      <div class="item item-key item-style5">
        <span>{{formData.lawerNum}}</span>
      </div>
    </div>
    <!-- 详情部分结束 -->

    <!-- 编辑部分 -->
    <div
      class="form-table"
      v-if="isEdit"
    >
      <div class="item item-key border-right">代理人</div>
      <div class="item item-value border-right">
        <span>
          <el-select
            v-model="paramsData.agentType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in agentTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item item-key border-right">委托人</div>
      <div class="item item-value">
        <span>
          <el-select
            v-model="paramsData.litigantId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in proposerInfoData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item item-key border-right">姓名</div>
      <div class="item item-value border-right">
        <span>
          <el-input
            v-model="paramsData.name"
            placeholder="请输入"
          ></el-input>
        </span>
      </div>
      <div class="item item-key border-right">民族</div>
      <div class="item item-value">
        <span>
          <el-input
            v-model="paramsData.nation"
            placeholder="请输入"
          ></el-input>
        </span>
      </div>
      <div class="item item-key border-right">性别</div>
      <div class="item item-value border-right">
        <span>
          <el-select
            v-model="paramsData.sex"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sexData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="item item-key border-right">年龄</div>
      <div class="item item-value">
        <span>
          <el-input
            v-model="paramsData.years"
            placeholder="请输入"
          ></el-input>
        </span>
      </div>
      <div class="item item-key">联系方式</div>
      <div class="item item-key item-style1">
        <el-input
          type="number"
          v-model="paramsData.agentMobile"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="item item-value">身份证号</div>
      <div class="item item-value item-style2">
        <el-input
          v-model="paramsData.identityCard"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="item item-key">住址</div>
      <div class="item item-key item-style3">
        <el-input
          v-model="paramsData.address"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="item item-value">工作单位/职务</div>
      <div class="item item-value item-style4">
        <el-input
          v-model="paramsData.unitInfo"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="item item-key">律师证件号</div>
      <div class="item item-key item-style5">
        <el-input
          v-model="paramsData.lawerNum"
          placeholder="请输入"
        ></el-input>
      </div>
    </div>
    <!-- 编辑部分结束 -->
  </div>
</template>

<script>
import { AGENTTYPEMAP } from '@/utils/constVal.js'
export default {
  data() {
    return {
      agentTypeData: [], //身份证类型
      formData: null, //表单数据
      paramsData: {
        litigantId: null, //委托人ID ,
        name: null, // 姓名
        agentType: null, //代理人类型 1.律师 ，2.法律工作者，3.单位工作人员，4.近亲属，5.公民
        agentIdentiCard: null, //身份证号
        address: null, // 地址
        lawerNum: null, // 律师证件号（若代理人类型选择律师才显示，并必填）
        sex: null, // 性别
        years: null, //年龄
        nation: null, //民族
        agentMobile: null, //联系方式
        unitInfo: null //工作职务
      }, //代理人提交对象
      proposerInfoData: [], // 代理人获取的申请人的信息
      sexData: [
        { id: 0, name: '男' },
        { id: 1, name: '女' }
      ]
    }
  },
  watch: {
    litigant: {
      handler() {
        this.formData = this.litigant
        this.getParamsData(this.formData)
      },
      deep: true
    },
    proposerInfo: {
      handler() {
        this.proposerInfoData = this.proposerInfo
      },
      deep: true
    }
  },
  props: {
    personType: null, // 添加人类型 1申请人 2代理人 3被申请人
    isEdit: {
      type: Boolean,
      value: false
    },
    isCaseCenter: {
      //是否在案件中心调用
      type: Boolean,
      value: true
    },
    litigant: null, //组件传来的受理人信息
    isAgent: {
      // 是否是代理人的表单
      //是否代理人
      type: Boolean,
      value: false
    },
    proposerInfo: null // 代理人信息
  },
  components: {},
  created() {
    this.formData = this.litigant
    this.getAgentTypeData()
    this.getParamsData(this.formData)
    console.log('----代理人信息----')
    console.log(this.formData)
    this.proposerInfoData = this.proposerInfo
  },
  mounted() {},
  methods: {
    getAgentTypeData() {
      for (let key in AGENTTYPEMAP) {
        this.agentTypeData.push({
          value: parseInt(key),
          label: AGENTTYPEMAP[key]
        })
      }
    },

    getParamsData(data) {
      if (!data) {
        return
      }
      this.paramsData = {
        litigantId: data.mandatorID, //委托人ID ,
        name: data.name, // 姓名
        agentType: data.agentType, //代理人类型 1.律师 ，2.法律工作者，3.单位工作人员，4.近亲属，5.公民
        agentIdentiCard: data.agentIdentiCard, //身份证号
        address: data.address, // 地址
        lawerNum: data.lawerNum // 律师证件号（若代理人类型选择律师才显示，并必填）
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form-table {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 120px 1fr);
  overflow: auto;
  border: 1px solid rgba(221, 223, 225, 1);
  .item {
    min-height: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #464a53;
    padding: 0 10px;
    border-bottom: 1px solid #dddfe1;
    &:nth-child(odd) {
      border-right: 1px solid #dddfe1;
    }
    &.border-right {
      border-right: 1px solid #dddfe1;
    }
    &.item-key {
      background-color: #fcf9fc;
      font-size: 14px;
    }
    &.item-value {
      min-width: 120px;
    }
    &.item-style1 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 4;
      grid-row-end: 5;
    }
    &.item-style2 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 5;
      grid-row-end: 6;
    }
    &.item-style3 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 6;
      grid-row-end: 7;
    }
    &.item-style4 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 7;
      grid-row-end: 8;
    }
    &.item-style5 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 8;
      grid-row-end: 9;
    }
  }
}
</style>
