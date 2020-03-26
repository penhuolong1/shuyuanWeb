<template>
  <div>
    <caseDetail :caseId="caseId"
                :isEdit="isEdit"
                :lawCaseData="lawCaseData"></caseDetail>
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
    <useInfo :isEdit="isEdit"
             :litigants="litigants"></useInfo>
    <!-- 纠纷概况 -->
    <dispute :isEdit="isEdit"></dispute>
    <!-- 证据信息 -->
    <evidenceInfo :isEdit="isEdit"></evidenceInfo>
  </div>
</template>

<script>
import caseDetail from '@/components/case/caseDetail'
import useInfo from './components/userInfo'
import dispute from './components/dispute'
import evidenceInfo from './components/evidenceInfo'
export default {
  data () {
    return {
      litigants: null, //受理人信息
      dispute: null, // 纠纷概括信息
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
    lawCaseData: null //案件详情
  },
  watch: {
    lawCaseData: {
      handler () {
        this.dealCaseData()
      },
      deep: true
    }
  },
  created () {
    console.log('-----isEdit---')
    console.log(this.isEdit)
  },
  mounted () { },
  methods: {
    // 处理案件详情数据 分成各组件需要的数据传递出去
    dealCaseData () {
      let data = JSON.parse(JSON.stringify(this.lawCaseData))
      this.litigants = data.litigants
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
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
