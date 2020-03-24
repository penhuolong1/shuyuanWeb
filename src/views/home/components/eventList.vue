<template>
  <div>
    <div class="header">
      <div class="text">事项列表</div>
    </div>
    <div class="tab-box">
      <tab
        :tabData="tabData"
        @selectTab="selectTab"
      ></tab>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        class="my-table my-table-1"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template> 

<script>
import tab from '@/components/tab/tab'
export default {
  data() {
    return {
      tabData: [
        {
          name: '全部事项'
        },
        {
          name: '已办'
        },
        {
          name: '未办'
        }
      ],
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
      ]
    }
  },
  components: {
    tab
  },
  created() {},
  mounted() {},
  methods: {
    selectTab() {}
  }
}
</script>

<style scoped lang="scss">
</style>
