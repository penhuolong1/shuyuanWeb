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
      id="tab1"
    ></tab1>
    <div
      class="main-wrapper"
      style="margin-top: 2px;"
    >
      <caseInfo
        :caseId="caseId"
        id="caseInfo"
        :isEdit="idEdit"
      ></caseInfo>
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
      ],
      idEdit: false // 是否处于编辑状态
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
      this.idEdit = false
      document.getElementById('tab1').scrollIntoView()
      console.log(this.caseId)
    },
    addCase() {
      // 点击添加案件跳转到菜单部分
      document.getElementById('tab1').scrollIntoView()
      this.idEdit = true
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
