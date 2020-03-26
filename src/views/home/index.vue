<template>
  <div>
    <div class="main-wrapper">
      <caseList></caseList>
    </div>
    <!-- 暂时先不用 -->
    <!-- <div class="main-wrapper event-wrapper">
      <eventList></eventList>
    </div> -->
  </div>
</template>

<script>
import caseList from '@/components/case/caseList'

export default {
  data() {
    return {
      caseId: null
    }
  },
  components: {
    caseList
    // eventList 暂时先不用
  },
  created() {},
  mounted() {
    caseList
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.event-wrapper {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
