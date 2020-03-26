<template>
  <div>
    <caseDetail
      :caseId="caseId"
      :isEdit="isEdit"
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
    <useInfo :isEdit="isEdit"></useInfo>
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
  data() {
    return {}
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
    }
  },
  watch: {
    caseId() {
      console.log(this.caseId)
    },
    isEdit() {
      console.log('-----isEdit---')
      console.log(this.isEdit)
    }
  },
  created() {
    console.log('-----isEdit---')
    console.log(this.isEdit)
  },
  mounted() {},
  methods: {}
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
