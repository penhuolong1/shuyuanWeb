<template>
  <div>
    <!-- 详情部分 -->
    <div class="form-table"
         v-if="!isEdit">
      <div class="item item-value border-right">{{personMap[personType]}}</div>
      <div class="item item-value item-style">
        <span></span>
      </div>
      <div class="item item-key">姓名</div>
      <div class="item item-value border-right">
        <span></span>
      </div>
      <div class="item item-key">民族</div>
      <div class="item item-value">
        <span></span>
      </div>
      <div class="item item-key">性别</div>
      <div class="item item-value border-right">
        <span></span>
      </div>
      <div class="item item-key">年龄</div>
      <div class="item item-value">
        <span></span>
      </div>
      <div class="item item-value">{{personType != 2 ? '证件号码':'证件号码&律师职业证号'}}</div>
      <div class="item item-value item-style1">
        <span></span>
      </div>
      <div class="item item-key">联系号码</div>
      <div class="item item-key item-style2">
        <span></span>
      </div>
      <div class="item item-value">住址</div>
      <div class="item item-value item-style3">
        <span></span>
      </div>
      <div class="item item-key">工作单位或职务</div>
      <div class="item item-key item-style4">
        <span></span>
      </div>
    </div>
    <!-- 详情部分结束 -->

    <!-- 编辑部分 -->
    <div class="form-table"
         v-if="isEdit">
      <div class="item item-value border-right">{{personMap[personType]}}</div>
      <div class="item item-value item-style">
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">姓名</div>
      <div class="item item-value border-right">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="item item-key">民族</div>
      <div class="item item-value">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="item item-key">性别</div>
      <div class="item item-value border-right">
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">年龄</div>
      <div class="item item-value">
        <el-input v-model="input"
                  type="number"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="item item-value">{{personType != 2 ? '证件号码':'证件号码&律师职业证号'}}</div>
      <div class="item item-value item-style1">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="item item-key">联系号码</div>
      <div class="item item-key item-style2">
        <el-input v-model="input"
                  type="number"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="item item-value">住址</div>
      <div class="item item-value item-style3">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
      <div class="item item-key">工作单位或职务</div>
      <div class="item item-key item-style4">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
    </div>
    <!-- 编辑部分结束 -->
  </div>
</template>

<script>
import { IDENTITYMAP, SEXMAP } from '@/utils/constVal.js'
export default {
  data () {
    return {
      input: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      personMap: {
        1: '申请人',
        2: '代理人',
        3: '被申请人'
      },
      litigants: null, //受理人信息
      formData: null //表单数据
    }
  },
  watch: {
    litigant: {
      handler () {
        console.log('---personFor中组件传来的受理人信息----')
        console.log(this.litigant)
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
    litigant: null //组件传来的受理人信息
  },
  components: {},
  created () { },
  mounted () { },
  methods: {
    // 处理受理人数据
    deallItigants () {
      let proposerList = [] //申请人数组
      let agentList = [] //代理人数组
      let respondentList = [] // 被申请人数组
      if (this.litigants && this.litigants.length > 0) {
        this.litigants.forEach(item => {
          if (item.litigationStatus) {
            if (item.litigationStatus.name == '申请人') {
              proposerList.push(item)
            }
            if (item.litigationStatus.name == '被申请人') {
              respondentList.push(item)
            }
          }
          if (item.lawyer && item.lawyer.length > 0) {
            item.lawyer.forEach(item1 => {
              agentList.push(item1)
            })
          }
        })
      }
      // 假如是申请人
      if (this.personType == 1) {
        this.formData = proposerList[this.index]
      } else if (this.personType == 2) {
        this.formData = agentList[this.index]
      } else if (this.personType == 3) {
        this.formData = respondentList[this.index]
      }
      console.log('-------申请人-------')
      console.log(proposerList)
      console.log('-------代理人-------')
      console.log(agentList)
      console.log('-------被申请人-------')
      console.log(respondentList)

      console.log('---------结果----------')
      console.log(this.formData)
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
    &.item-style {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 2;
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
    &.item-value {
      min-width: 120px;
    }
  }
}
</style>
