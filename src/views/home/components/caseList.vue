<template>
  <div class="">
    <div class="header">
      <div class="text">案件列表</div>
    </div>
    <div class="search-wrapper">
      <div class="search-item">
        <div class="search-label">全部: </div>
        <div class="search-content">
          <el-select
            v-model="listCaseParams.year"
            placeholder="请选择收案年度"
            @change="searchCardList"
          >
            <el-option
              v-for="(item, index) in yearSelectData"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
          <el-input
            placeholder="法院代字"
            v-model="listCaseParams.courtStr"
            @keyup.enter.native="searchCardList"
          >
          </el-input>
          <el-input
            placeholder="类型代字"
            v-model="listCaseParams.typeStr"
            @keyup.enter.native="searchCardList"
          >
          </el-input>
          <div class="input-append">
            <el-input
              placeholder="案件编号"
              v-model="listCaseParams.caseNoStr"
              @keyup.enter.native="searchCardList"
            >
            </el-input>
            <div class="append">号</div>
          </div>
        </div>
      </div>
      <search-btn
        @search="search"
        @add="add"
        @exportData="exportData"
      ></search-btn>
    </div>
    <div
      class="tab-box"
      v-if="isTable"
    >
      <tab
        :tabData="tabData"
        @selectTab="selectTab"
      ></tab>
    </div>
    <div
      class="table-wrapper"
      v-if="isTable"
    >
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="listCaseData"
        tooltip-effect="dark"
        style="width: 100%"
        class="my-table"
      >
        <el-table-column
          label=""
          width="50"
        >
          <template slot-scope="scope">
            <el-dropdown
              trigger="click"
              placement="bottom-start"
            >
              <span class="el-dropdown-link">
                <el-checkbox></el-checkbox>
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="table-dropdown"
              >
                <el-dropdown-item
                  icon="el-icon-plus"
                  @click.native="detailCase(scope.row.id)"
                >
                  查看
                </el-dropdown-item>
                <el-dropdown-item
                  icon="el-icon-delete"
                  @click.native="delCase(scope.row.id)"
                >
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          prop="num"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="dCaseNo"
          label="溯源登记号"
        >
        </el-table-column>
        <el-table-column label="溯源调解号">
          <template slot-scope="scope">
            <span class="color-gray">{{ scope.row.sqCaseNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="briefName"
          label="纠纷事由"
        >
        </el-table-column>
        <el-table-column
          prop="briefName"
          label="申请人/被申请人"
        >
          <template slot-scope="scope">
            <p><span class="table-circle table-theme-color"></span>{{scope.row.accept}}</p>
            <p><span class="table-circle"></span>{{ scope.row.byaccept }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="briefName"
          label="涉财产/数额"
        >
          <template slot-scope="scope">
            <p>{{scope.row.isAP ? '是':'否'}}</p>
            <p>{{ scope.row.applyStandard }}</p>
          </template>
        </el-table-column>
        <el-table-column label="受理机构">
          <template slot-scope="scope">
            <span class="color-gray">{{ scope.row.courtName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mediater"
          label="调解员"
        >
        </el-table-column>
        <el-table-column label="受理时间">
          <template slot-scope="scope">
            <span class="color-gray">{{ scope.row.registerDate | timeDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="调解时限">
          <template slot-scope="scope">
            <span>{{ scope.row.mediateTerm | timeDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前进展">
          <template slot-scope="scope">
            <span class="color-gray">{{ scope.row.process}}</span>
          </template>
        </el-table-column>
        <el-table-column label="临期预警">
          <template slot-scope="scope">
            <span
              class="table-circle"
              :class="scope.row.degree"
            ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="page-wrapper"
      v-if="isTable"
    >
      <el-pagination
        background
        :page-size="listCaseParams.pageSize"
        :pager-count="5"
        layout="prev, pager, next"
        :total="listCastTotal"
        @prev-click="caseListPrev"
        @next-click="caseListNext"
        @current-change="caseListPage"
      >
      </el-pagination>
    </div>
    <div
      class="editTable"
      v-if="!isTable"
    >
      <caseDetail :caseId="caseId"></caseDetail>
    </div>
  </div>
</template>

<script>
import searchBtn from '@/components/button/searchButon'
import caseDetail from '../components/components/detailCase'
import tab from '@/components/tab/tab'
import { listCase, delCase } from '@/api/case/case.js'
export default {
  data() {
    return {
      listCaseParams: {
        pageNum: 1,
        pageSize: 5,
        examine: null, //是否审核
        mediate: null // 是否调解
      }, //案件列表搜索条件
      yearSelectData: [
        {
          value: '',
          label: '全部'
        }
      ], //收案年度下拉框数据
      value: '',
      input2: '',
      multipleSelection: [],
      listCaseData: [], // 案件列表数据
      listCastTotal: 0, // 案件列表总数
      loading: true,
      tabData: [
        {
          name: '全部案件'
        },
        {
          name: '已审核'
        },
        {
          name: '未审核'
        },
        {
          name: '已调解'
        },
        {
          name: '未调解'
        }
      ], // tab切换栏的数据
      isTable: true,
      caseId: null //案件ID
    }
  },
  components: {
    searchBtn,
    tab,
    caseDetail
  },
  created() {
    this.getCaseListData()
    this.getYearSelectData()
  },
  methods: {
    search() {
      this.searchCardList()
    },
    add() {
      console.log('--add--')
      this.caseId = ''
      this.isTable = false
    },
    exportData() {
      console.log('--exportData--')
    },
    // 获取案件列表
    getCaseListData() {
      this.loading = true
      listCase(this.listCaseParams).then(res => {
        this.listCastTotal = res.data.total
        this.listCaseData = res.data.content.map((item, index) => {
          item.num = index + 1
          item.accept = res.litigants[index][1]
          item.byaccept = res.litigants[index][2]
          let degree = 'table-warn-color'
          if (item.degree || item.degree === 0) {
            if (item.degree === 0 || item.degree === 1) {
              // 重新给临时预警分类 0,1为紧急状态为红色 其他为正常状态为黄色
              degree = 'table-danger-color'
            }
          }
          item.degree = degree
          return item
        })
        this.loading = false
      })
    },
    handleSelectionChange() {},
    // 获取收案年度的下拉框数据
    getYearSelectData() {
      let nowYear = new Date().getFullYear()
      for (let i = 0; i <= 3; i++) {
        let obj = {
          value: nowYear - i,
          label: nowYear - i
        }
        this.yearSelectData.push(obj)
      }
    },
    // 搜索案件列表
    searchCardList() {
      this.getCaseListData()
    },
    // 上一页
    caseListPrev(index) {
      console.log('----上一页---------')
      this.listCaseParams.pageNum = index
      this.searchCardList()
    },
    // 下一页
    caseListNext(index) {
      this.listCaseParams.pageNum = index
      this.searchCardList()
    },
    // 选择第几页
    caseListPage(index) {
      this.listCaseParams.pageNum = index
      this.searchCardList()
    },
    // 选择菜单切换栏
    selectTab(index) {
      this.listCaseParams.examine = null
      this.listCaseParams.mediate = null
      switch (index) {
        case 0:
          this.listCaseParams.examine = null
          this.listCaseParams.mediate = null
          break
        case 1:
          this.listCaseParams.examine = 1
          break
        case 2:
          this.listCaseParams.examine = 0
          break
        case 3:
          this.listCaseParams.mediate = 1
          break
        case 4:
          this.listCaseParams.mediate = 0
          break
      }
      this.searchCardList()
    },
    // 点击获取caseId 并切换判断条件展示详情部分隐藏列表部分
    detailCase(id) {
      this.caseId = id
      this.isTable = false
    },
    // 删除案件
    delCase(id) {
      this.$confirm('是否确认删除')
        .then(() => {
          delCase({ caseId: id }).then(res => {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.searchCardList()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

.search-wrapper {
  margin-top: 30px;
}
.tab-box {
  margin-top: 30px;
}
.table-wrapper {
  margin-top: 3px;
}
.editTable {
  margin-top: 30px;
  min-height: 450px;
  .header {
    margin-bottom: 30px;
    > span {
      font-size: 16px;
      color: #464a53;
    }
  }
}
.page-wrapper {
  overflow: hidden;
  margin-top: 10px;
  .el-pagination {
    float: right;
    border: 1px solid rgba(224, 227, 233, 1);
    border-radius: 5px;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background-color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: $themeColor;
  }
}
.table-dropdown {
  &.el-dropdown-menu {
    position: relative;
    // &:after {
    //   content: '';
    //   height: 100%;
    //   width: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   background: inherit;
    //   filter: blur(2px);
    // }
  }
}
</style>
