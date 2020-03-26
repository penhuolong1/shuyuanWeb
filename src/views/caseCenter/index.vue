<template>
  <div>
    <div class="main-wrapper">
      <caseList
        :isCaseCenter='isCaseCenter'
        @detailCase="detailCase"
        @add="addCase"
      ></caseList>
    </div>
    <tab1
      :menuData="menuData"
      @selectMenu="selectMenu"
    ></tab1>
    <div
      class="main-wrapper"
      style="margin-top: 2px;"
    >
      <caseInfo :caseId="caseId"></caseInfo>
    </div>
  </div>
</template>

<script>
import caseList from '@/components/case/caseList'
import caseInfo from './components/caseInfo/index'
import tab1 from '@/components/tab/tab1'

export default {
  data() {
    return {
      caseId: null,
      isCaseCenter: 1, //判断该组件是否在案件中心使用
      menuData: [
        // 菜单的数据
        {
          name: '案情信息'
        },
        {
          name: '办理信息'
        },
        {
          name: '组织调解'
        }
      ]
    }
  },
  components: {
    caseList,
    tab1,
    caseInfo
  },
  created() {},
  mounted() {
    caseList
  },
  methods: {
    // 选择菜单
    selectMenu(index) {
      console.log(index)
    },
    // 查询案件详情
    detailCase(id) {
      this.caseId = id
      console.log(this.caseId)
    },
    addCase() {
      console.log('添加案件')
    }
  }
}
</script>

<style scoped lang="scss">
.event-wrapper {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
