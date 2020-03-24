<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <my-header></my-header>
      <!-- 菜单选项卡 -->
      <!-- 视图容器 -->
      <!-- <div class="viewStyle">
        <Table
          :tableData="tableData"
          :tableHead="tableHead"
        ></Table>
      </div> -->
      <router-view class="viewStyle"></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from './sidebar/'
import MyHeader from './header/'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableHead: [
        {
          prop: 'date',
          label: '日期',
          width: '180'
        },
        {
          prop: 'address',
          label: '地址',
          width: '180'
        },
        {
          prop: 'name',
          label: '姓名',
          width: ''
        }
      ]
    }
  },
  components: { sidebar, MyHeader },
  computed: {
    ...mapGetters(['getsidebar']),
    classObj() {
      return {
        hideSidebar: !this.getsidebar.opened,
        openSidebar: this.getsidebar.opened
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.app-wrapper {
  overflow: hidden;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #f1f4f7;
  .viewStyle {
    width: 100%;
  }
  .btnColor {
    background-color: #5585c9;
  }
}
</style>
