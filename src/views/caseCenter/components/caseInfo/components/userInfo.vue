<template>
  <div class="party-info-wrapper">
    <div class="header">申请人</div>
    <div class="party-info-wrapper-box">
      <!-- 申请人部分 -->
      <div class="proposer-wrapper">
        <personInfo
          v-for="(item, index) in proposerItems"
          :key="index"
          :headText="item.name"
          :personType="1"
          @add="addProPoser"
          @del="delProPoser(index)"
          :isEdit="isEdit"
          :index="index"
        ></personInfo>
      </div>
      <!-- 代理人部分 -->
      <div class="agent-wrapper">
        <personInfo
          v-for="(item, index) in agentItems"
          :key="index"
          :headText="item.name"
          :personType="2"
          @add="addagent"
          @del="delagent(index)"
          :isEdit="isEdit"
          :index="index"
        ></personInfo>
      </div>
      <!-- 被申请人部分 -->
      <div class="respondent-wrapper">
        <personInfo
          v-for="(item, index) in respondentItems"
          :key="index"
          :headText="item.name"
          :personType="3"
          @add="addrespondent"
          @del="delrespondent(index)"
          :isEdit="isEdit"
          :index="index"
        ></personInfo>
      </div>
    </div>
  </div>
</template>

<script>
import personInfo from './personInfo'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      proposerItems: [
        {
          name: '申请人1'
        }
      ], // 申请人表单组件数据
      agentItems: [
        {
          name: '申请人代理人信息1'
        }
      ], // 代理人表单组件数据
      respondentItems: [
        {
          name: '被申请人1'
        }
      ], // 被申请人表单组件数据
      litigants: null // 受理人数据
    }
  },
  props: {
    isEdit: {
      // 是否处于编辑状态
      type: Boolean,
      value: false
    }
  },
  computed: {
    ...mapGetters(['getCaseData'])
  },
  watch: {
    getCaseData() {
      this.litigants = this.getCaseData.litigants
        ? this.getCaseData.litigants
        : ''
      console.log('----触发-----')
      this.deallItigants()
    }
  },
  components: {
    personInfo
  },
  created() {},
  mounted() {},
  methods: {
    // 添加申请人
    addProPoser() {
      this.proposerItems.push({})
      this.proposerItems.forEach((item, index) => {
        item.name = `申请人${index + 1}`
      })
      console.log('--添加申请人--')
    },
    // 删除代理人
    delProPoser(index) {
      if (this.proposerItems.length == 1) {
        this.$message({
          showClose: true,
          message: '当前申请人信息只有一条不允许删除',
          type: 'error'
        })
        return
      }
      this.proposerItems.splice(index, 1)
      this.proposerItems.forEach((item, index) => {
        item.name = `申请人${index + 1}`
      })
      console.log('--删除申请人----')
    },
    // 添加代理人
    addagent() {
      this.agentItems.push({})
      this.agentItems.forEach((item, index) => {
        item.name = `申请人代理人信息${index + 1}`
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
      this.agentItems.forEach((item, index) => {
        item.name = `申请人代理人信息${index + 1}`
      })
    },
    // 添加被申请人
    addrespondent() {
      this.respondentItems.push({})
      this.respondentItems.forEach((item, index) => {
        item.name = `被申请人${index + 1}`
      })
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
      this.respondentItems.forEach((item, index) => {
        item.name = `被申请人${index + 1}`
      })
    },
    // 处理受理人数据
    deallItigants() {
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
      // 申请人
      if (proposerList && proposerList.length > 0) {
        this.proposerItems = []
        for (let i = 0; i < proposerList.length; i++) {
          this.proposerItems.push({
            name: `申请人${i + 1}`
          })
        }
      }
      // 代理人
      if (agentList && agentList.length > 0) {
        this.agentItems = []
        for (let i = 0; i < agentList.length; i++) {
          this.agentItems.push({
            name: `代理人${i + 1}`
          })
        }
      }
      // 被申请人
      if (proposerList && proposerList.length > 0) {
        this.respondentItems = []
        for (let i = 0; i < proposerList.length; i++) {
          this.respondentItems.push({
            name: `被申请人${i + 1}`
          })
        }
      }
      console.log('11111111')
      console.log(this.proposerItems)
      console.log(this.agentItems)
      console.log(this.respondentItems)
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
