<template>
  <div>
    <div class="main-wrapper">
      <caseList
        :isCaseCenter='isCaseCenter'
        @detailCase="detailCase"
        @add="addCase"
        @getLawCaseData="getLawCaseData"
      ></caseList>
    </div>
    <tab1
      :menuData="menuData"
      @selectMenu="selectMenu"
      id="tab1"
      v-if="isShow"
    ></tab1>
    <div
      class="main-wrapper"
      style="margin-top: 2px;"
      v-if="isShow"
    >
      <caseInfo
        :caseId="caseId"
        id="caseInfo"
        :isEdit="idEdit"
        :lawCaseData="lawCaseData"
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
      idEdit: false, // 是否处于编辑状态
      lawCaseData: null, // 案件详情信息
      isShow: false // 当在首页时开始只显示列表 当点击添加话查看详情时才显示下面对应的菜单
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
      this.isShow = true
      this.idEdit = false
      this.$nextTick(() => {
        document.getElementById('tab1').scrollIntoView()
      })
      console.log(this.caseId)
    },
    addCase() {
      // 点击添加案件跳转到菜单部分
      this.isShow = true
      this.$nextTick(() => {
        document.getElementById('tab1').scrollIntoView()
      })
      this.idEdit = true
      this.lawCaseData = null
      console.log('添加案件')
    },
    // 获取子组件传过来的按键详情
    getLawCaseData(data) {
      this.lawCaseData = data
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
