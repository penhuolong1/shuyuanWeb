<template>
  <div>
    <caseDetail
      :caseId="caseId"
      :isEdit="isEdit"
      :lawCaseData="lawCaseData"
    ></caseDetail>
    <div class="imgs-wrapper">
      <div class="img-item">
        <img src="@/assets/img/partyInfo.png">
      </div>
      <div class="img-item">
        <img src="@/assets/img/dispute.png">
      </div>
      <div class="img-item">
        <img src="@/assets/img/evidenceInfo.png">
      </div>
    </div>
    <!-- 申请人 -->
    <useInfo
      :isEdit="isEdit"
      :litigants="litigants"
      :caseId="caseId"
    ></useInfo>
    <!-- 纠纷概况 -->
    <dispute
      :isEdit="isEdit"
      :disputeInfo="disputeInfo"
      :caseId="caseId"
      :countId="countId"
    ></dispute>
    <!-- 证据信息 -->
    <evidenceInfo
      :isEdit="isEdit"
      :evidenceData="evidenceData"
    ></evidenceInfo>
  </div>
</template>

<script>
import caseDetail from '@/components/case/caseDetail'
import useInfo from './components/userInfo'
import dispute from './components/dispute'
import evidenceInfo from './components/evidenceInfo'
export default {
  data() {
    return {
      litigants: null, //受理人信息
      disputeInfo: null, // 纠纷概括信息
      evidenceData: null // 证据信息
    }
  },
  components: {
    caseDetail,
    useInfo, // 申请人部分组件
    dispute, // 纠纷概况部分组件
    evidenceInfo //证据信息组件
  },
  props: {
    caseId: null,
    isEdit: {
      type: Boolean,
      value: false
    },
    lawCaseData: null, //案件详情
    countId: null // 机构ID
  },
  watch: {
    lawCaseData: {
      handler() {
        this.dealCaseData()
      },
      deep: true
    },
    countId() {
      console.log('机构ID1')
      console.log(this.countId)
    }
  },
  created() {
    console.log('机构ID1')
    console.log(this.countId)
  },
  mounted() {},
  methods: {
    // 处理案件详情数据 分成各组件需要的数据传递出去
    dealCaseData() {
      let data = JSON.parse(JSON.stringify(this.lawCaseData))
      this.litigants = data.litigants
      this.disputeInfo = {
        mediateRequest: data.mediateRequest,
        reason: data.reason
      }
      this.evidenceData = []
      if (data.litigants && data.litigants.length > 0) {
        data.litigants.forEach(item => {
          if (item.evidences && item.evidences.length > 0) {
            item.evidences.forEach(item1 => {
              this.evidenceData.push(item1)
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.imgs-wrapper {
  display: flex;
  width: 100%;
  margin-top: 50px;
  .img-item {
    flex: 1;
    &:nth-child(2) {
      padding: 0 90px;
    }
    img {
      width: 100%;
    }
  }
}
</style>
