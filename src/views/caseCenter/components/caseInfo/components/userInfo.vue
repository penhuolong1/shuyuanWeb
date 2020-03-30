<template>
  <div class="party-info-wrapper">
    <div class="header">申请人</div>
    <div
      class="party-info-wrapper-box"
      v-if="isshow"
    >
      <!-- 申请人部分 -->
      <div class="proposer-wrapper">
        <personInfo
          v-for="(item, index) in proposerItems"
          :key="index"
          :headText="item.name+(index+1)"
          :personType="1"
          @add="addProPoser"
          @del="delProPoser(index)"
          :isEdit="isEdit"
          :caseId="caseId"
          :litigant="item.data"
        ></personInfo>
      </div>
      <!-- 代理人部分 -->
      <div class="agent-wrapper">
        <agentInfo
          v-for="(item, index) in agentItems"
          :key="index"
          :headText="item.name+(index+1)"
          :personType="2"
          @add="addagent"
          @del="delagent(index)"
          :isEdit="isEdit"
          :litigant="item.data"
          :caseId="caseId"
          :proposerInfo="proposerInfo"
        ></agentInfo>
      </div>
      <!-- 被申请人部分 -->
      <div class="respondent-wrapper">
        <personInfo
          v-for="(item, index) in respondentItems"
          :key="index"
          :headText="item.name+(index+1)"
          :personType="3"
          @add="addrespondent"
          @del="delrespondent(index)"
          :isEdit="isEdit"
          :caseId="caseId"
          :litigant="item.data"
        ></personInfo>
      </div>
    </div>
  </div>
</template>

<script>
import personInfo from './personInfo'
import agentInfo from './agentInfo'
import { IDENTITYMAP, SEXMAP, AGENTTYPEMAP } from '@/utils/constVal.js'
import { deleteLitigant } from '@/api/case/case.js'

export default {
  data() {
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
      isshow: false, // 当受理人数据没有处理完毕的时候不处理显示组件
      proposerInfo: [] //申请人信息用于添加代理人信息的时候和代理人关联
    }
  },
  props: {
    isEdit: {
      // 是否处于编辑状态
      type: Boolean,
      value: false
    },
    caseId: null, //获取案件ID
    litigants: null //受理人信息
  },
  watch: {
    litigants: {
      handler() {
        this.deallItigants()
      },
      deep: true
    },
    isEdit() {
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
    }
  },
  components: {
    personInfo,
    agentInfo
  },
  created() {
    if (this.isEdit) {
      this.isshow = true
    }
  },
  mounted() {},
  methods: {
    // 添加申请人
    addProPoser() {
      this.proposerItems.push({
        name: '申请人',
        data: {}
      })
      console.log('--添加申请人--')
    },
    // 删除申请人
    delProPoser(index) {
      if (this.proposerItems.length == 1) {
        this.$message({
          showClose: true,
          message: '当前申请人信息只有一条不允许删除',
          type: 'error'
        })
        return
      }
      let id = this.proposerItems[index].data.id
      if (id) {
        this.$confirm('是否确认删除')
          .then(() => {
            deleteLitigant({ litigantId: id }).then(res => {
              if (res.state == 100) {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'success'
                })
                this.proposerItems.splice(index, 1)
              }
            })
          })
          .catch(() => {})
      } else {
        this.proposerItems.splice(index, 1)
      }
    },
    // 添加代理人
    addagent() {
      this.agentItems.push({
        name: '代理人',
        data: {}
      })
    },
    // 删除代理人
    delagent(index) {
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
    addrespondent() {
      this.respondentItems.push({})
    },
    // 删除被申请人
    delrespondent(index) {
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
    deallItigants() {
      let data = JSON.parse(JSON.stringify(this.litigants))
      if (data && data.length > 0) {
        this.proposerItems = []
        this.respondentItems = []
        let proposerItemsFlag = false
        let respondentItemsFlag = false
        let lawyerFlag = false
        data.forEach(item => {
          if (item.litigationStatus) {
            // 转换成personForm通用的键名以及翻译一些类型
            item.typeChar = IDENTITYMAP[item.identityType]
            item.name = item.litigantName
            item.sex = SEXMAP[item.litigantSex]
            item.phone = item.litigantPhone
            if (item.litigationStatus.id == 4) {
              proposerItemsFlag = true
              //申请人
              this.proposerItems.push({
                name: '申请人',
                data: item
              })
              this.proposerInfo.push({
                id: item.id,
                name: item.litigantName
              })
            }
            if (item.litigationStatus.id == 5) {
              respondentItemsFlag = true
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
              lawyerFlag = true
              item1.mandatorName = item.litigantName
              item1.mandatorID = item.id
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
        if (!proposerItemsFlag) {
          this.proposerItems = [
            {
              name: '申请人',
              data: {}
            }
          ]
        }
        if (!respondentItemsFlag) {
          this.respondentItems = [
            {
              name: '被申请人',
              data: {}
            }
          ]
        }
        if (!lawyerFlag) {
          this.agentItems = [
            {
              name: '申请人代理人信息',
              data: {}
            }
          ]
        }
      } else {
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
      }

      this.isshow = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.party-info-wrapper {
  margin-top: 50px;
  .header {
    font-size: 22px;
    color: #464a53;
  }
}
</style>
