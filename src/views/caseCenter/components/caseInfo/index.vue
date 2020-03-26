<template>
  <div>
    <caseDetail :caseId="caseId"></caseDetail>
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
    <div class="user"></div>
    <useInfo></useInfo>
  </div>
</template>

<script>
import caseDetail from '@/components/case/caseDetail'
import useInfo from './components/userInfo'
export default {
  data() {
    return {}
  },
  components: {
    caseDetail,
    useInfo
  },
  props: {
    caseId: null
  },
  watch: {
    caseId() {
      console.log(this.caseId)
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
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
