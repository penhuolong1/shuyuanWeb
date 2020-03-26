<!-- 搜索部分按钮合集的组件 -->
<template>
  <div class="btn-wrapper">
    <el-button
      type="primary"
      round
      class="search"
      @click="search"
    >搜索</el-button>
    <el-button
      type="primary"
      round
      class="add"
      @click="add"
    >添加</el-button>
    <el-button
      type="primary"
      round
      class="export"
      @click="exportData"
    >导入</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    search() {
      this.$emit('search')
    },
    add() {
      this.$emit('add')
    },
    exportData() {
      this.$emit('exportData')
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
.btn-wrapper {
  margin-left: 50px;
  display: inline;
  .search {
    background-color: $themeColor;
  }
  .add {
    background-color: #00c3ff;
    border-color: #00c3ff;
  }
  .export {
    background-color: #81f0ff;
    border-color: #81f0ff;
  }
  .el-button {
    padding: 0px;
    height: 35px;
    line-height: 35px;
    width: 90px;
    margin: 0px;
    margin-right: 25px;
    margin-top: 20px;
  }
}
</style>
