<template>
  <div class="party-info-wrapper">
    <div class="header">申请人</div>
    <div class="party-info-wrapper-box"
         v-if="isshow">
      <!-- 申请人部分 -->
      <div class="proposer-wrapper">
        <personInfo v-for="(item, index) in proposerItems"
                    :key="index"
                    :headText="item.name+(index+1)"
                    :personType="1"
                    @add="addProPoser"
                    @del="delProPoser(index)"
                    :isEdit="isEdit"
                    :litigant="item.data"></personInfo>
      </div>
      <!-- 代理人部分 -->
      <div class="agent-wrapper">
        <personInfo v-for="(item, index) in agentItems"
                    :key="index"
                    :headText="item.name+(index+1)"
                    :personType="2"
                    @add="addagent"
                    @del="delagent(index)"
                    :isEdit="isEdit"
                    :litigant="item.data"
                    :isAgent="true"></personInfo>
      </div>
      <!-- 被申请人部分 -->
      <div class="respondent-wrapper">
        <personInfo v-for="(item, index) in respondentItems"
                    :key="index"
                    :headText="item.name+(index+1)"
                    :personType="3"
                    @add="addrespondent"
                    @del="delrespondent(index)"
                    :isEdit="isEdit"
                    :litigant="item.data"></personInfo>
      </div>
    </div>
  </div>
</template>

<script>
import personInfo from './personInfo'
import { IDENTITYMAP, SEXMAP, AGENTTYPEMAP } from '@/utils/constVal.js'
export default {
  data () {
    return {
      proposerItems: [
        {
          name: '申请人',
          data: {}
        }
      ], // 申请人表单组件数据
      agentItems: [
        {
          name: '申请人代理人信息',
          data: {}
        }
      ], // 代理人表单组件数据
      respondentItems: [
        {
          name: '被申请人',
          data: {}
        }
      ],
      isshow: false // 当受理人数据没有处理完毕的时候不处理显示组件
    }
  },
  props: {
    isEdit: {
      // 是否处于编辑状态
      type: Boolean,
      value: false
    },
    litigants: null //受理人信息
  },
  watch: {
    litigants: {
      handler () {
        this.deallItigants()
      },
      deep: true
    },
    isEdit () {
      if (this.isEdit) {
        this.isshow = true
        this.proposerItems = [
          {
            name: '申请人',
            data: {}
          }
        ]
        this.agentItems = [
          {
            name: '申请人代理人信息',
            data: {}
          }
        ]
        this.respondentItems = [
          {
            name: '被申请人',
            data: {}
          }
        ]
      } else {
        this.isshow = false
      }
      console.log('---isEdit----')
      console.log(this.isEdit)
    }
  },
  components: {
    personInfo
  },
  created () {
    if (this.isEdit) {
      this.isshow = true
    }
  },
  mounted () { },
  methods: {
    // 添加申请人
    addProPoser () {
      this.proposerItems.push({})
      console.log('--添加申请人--')
    },
    // 删除代理人
    delProPoser (index) {
      if (this.proposerItems.length == 1) {
        this.$message({
          showClose: true,
          message: '当前申请人信息只有一条不允许删除',
          type: 'error'
        })
        return
      }
      this.proposerItems.splice(index, 1)
    },
    // 添加代理人
    addagent () {
      this.agentItems.push({})
    },
    // 删除代理人
    delagent (index) {
      if (this.agentItems.length == 1) {
        this.$message({
          showClose: true,
          message: '当前申请人代理人信息只有一条不允许删除',
          type: 'error'
        })
        return
      }
      this.agentItems.splice(index, 1)
    },
    // 添加被申请人
    addrespondent () {
      this.respondentItems.push({})
    },
    // 删除被申请人
    delrespondent (index) {
      if (this.respondentItems.length == 1) {
        this.$message({
          showClose: true,
          message: '当前被申请人信息只有一条不允许删除',
          type: 'error'
        })
        return
      }
      this.respondentItems.splice(index, 1)
    },
    // 处理受理人数据
    deallItigants () {
      let data = JSON.parse(JSON.stringify(this.litigants))
      if (data && data.length > 0) {
        this.proposerItems = []
        this.respondentItems = []
        data.forEach(item => {
          if (item.litigationStatus) {
            // 转换成personForm通用的键名以及翻译一些类型
            item.typeChar = IDENTITYMAP[item.identityType]
            item.name = item.litigantName
            item.sex = SEXMAP[item.litigantSex]
            item.phone = item.litigantPhone
            if (item.litigationStatus.id == 4) {
              //申请人
              this.proposerItems.push({
                name: '申请人',
                data: item
              })
            }
            if (item.litigationStatus.id == 5) {
              //被申请人
              this.respondentItems.push({
                name: '被申请人',
                data: item
              })
            }
          }
          if (item.lawyer && item.lawyer.length > 0) {
            this.agentItems = []
            item.lawyer.forEach(item1 => {
              item1.mandatorName = item1.litigantName
              item1.mandatorID = item1.id
              item1.typeChar = AGENTTYPEMAP[item1.agentType]
              item1.name = item1.agentName
              item1.sex = ''
              item1.identityCard = item1.agentIdentiCard
              item1.phone = item1.litigantPhone
              this.agentItems.push({
                name: '申请人代理人信息',
                data: item1
              })
            })
          }
        })
      }
      this.isshow = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
.party-info-wrapper {
  margin-top: 50px;
  .header {
    font-size: 22px;
    color: #464a53;
  }
}
</style>
