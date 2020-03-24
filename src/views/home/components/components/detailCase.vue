<template>
  <div>
    <div class="header">
      <span>添加案件信息</span>
      <editBtn
        @edit="edit"
        @cancel="cancel"
        @save="save"
        @back="back"
      ></editBtn>
    </div>
    <!-- 详情部分 -->
    <div
      class="form-table"
      v-if="!isEdit && detailCaseData"
    >
      <div class="item item-key">登记号</div>
      <div class="item item-value">
        <span>{{detailCaseData.dCaseNo}}
        </span>
      </div>
      <div class="item item-key">调解号</div>
      <div class="item item-value">
        <span>{{detailCaseData.sqCaseNo}}
        </span>
      </div>
      <div class="item item-key">纠纷事由</div>
      <div class="item item-value">
        <span v-if="detailCaseData.brief">{{detailCaseData.brief.name}}
        </span>
      </div>
      <div class="item item-key">涉财产</div>
      <div class="item item-value">
        <span>{{detailCaseData.aboutProperty ? '是':'否'}}
        </span>
      </div>
      <div class="item item-key">述求金额(元)</div>
      <div class="item item-value">
        <span>{{detailCaseData.applyStandard}}
        </span>
      </div>
      <div class="item item-key">案件来源</div>
      <div class="item item-value">
        <span>{{detailCaseData.caseSource}}
        </span>
      </div>
      <div class="item item-key">审核/登记机构</div>
      <div class="item item-value">
        <span>{{detailCaseData.registerCourt}}
        </span>
      </div>
      <div class="item item-key">调解机构</div>
      <div class="item item-value">
        <span v-if="detailCaseData.court">{{detailCaseData.court.name}}
        </span>
      </div>
      <div class="item item-key">调解员</div>
      <div class="item item-value">
        <span v-if="detailCaseData.mediater">{{detailCaseData.mediater.name}}
        </span>
      </div>
      <div class="item item-key">审核/登记时间</div>
      <div class="item item-value">
        <span>{{detailCaseData.registerDate | time}}
        </span>
      </div>
      <div class="item item-key">调解期限</div>
      <div class="item item-value">
        <span>{{detailCaseData.mediateTerm | time}}
        </span>
      </div>
      <div class="item item-key">当前状态</div>
      <div class="item item-value">
        <span>{{detailCaseData.processChar}}
        </span>
      </div>
    </div>
    <!-- 详情部分结束 -->
    <!-- 编辑部分 -->
    <div
      class="form-table"
      v-if="isEdit"
    >
      <div class="item item-key">登记号</div>
      <div class="item item-value">
        <el-input
          v-model="editCaseDetail.dCaseNo"
          placeholder="登记号"
        ></el-input>
      </div>
      <div class="item item-key">调解号</div>
      <div class="item item-value">
        <el-input
          v-model="editCaseDetail.sqCaseNo"
          placeholder="调解号"
        ></el-input>
      </div>
      <div class="item item-key">纠纷事由</div>
      <div class="item item-value">
        <el-select
          v-model="editCaseDetail.briefId"
          placeholder="请选择"
        >
          <el-option
            v-for="items in briefData"
            :key="items.id"
            :label="items.name"
            :value="items.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">涉财产</div>
      <div class="item item-value">
        <el-select
          v-model="editCaseDetail.isAboutProperty"
          placeholder="请选择"
        >
          <el-option
            v-for="(items,index) in aboutPropertyOptions"
            :key="index"
            :label="items.label"
            :value="items.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">述求金额(元)</div>
      <div class="item item-value">
        <el-input
          v-model="editCaseDetail.applyStandard"
          placeholder="述求金额"
        ></el-input>
      </div>
      <div class="item item-key">案件来源</div>
      <div class="item item-value">
        <el-input v-model="editCaseDetail.caseSource"></el-input>
      </div>
      <div class="item item-key">审核/登记机构</div>
      <div class="item item-value">
        <el-select
          v-model="editCaseDetail.registerCourtId"
          placeholder="请选择"
        >
          <el-option
            v-for="item in mediaterData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">调解机构</div>
      <div class="item item-value">
        <el-select
          v-model="editCaseDetail.mediateCourtId"
          placeholder="请选择"
          @change="selectMeduater"
        >
          <el-option
            v-for="item in mediaterData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">调解员</div>
      <div class="item item-value">
        <el-input
          v-model="editCaseDetail.mediaterId"
          placeholder="调解员"
        ></el-input>
      </div>
      <div class="item item-key">审核/登记时间</div>
      <div class="item item-value">
        <el-date-picker
          v-model="editCaseDetail.registerDate"
          type="date"
          placeholder="选择审核/登记时间"
        >
        </el-date-picker>
      </div>
      <div class="item item-key">调解期限</div>
      <div class="item item-value">
        <el-date-picker
          v-model="editCaseDetail.mediateTerm"
          type="date"
          placeholder="选择调解期限"
        >
        </el-date-picker>
      </div>
      <div class="item item-key">当前状态</div>
      <div class="item item-value">
        <el-select
          v-model="editCaseDetail.process"
          placeholder="请选择"
        >
          <el-option
            v-for="item in processTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 编辑部分结束 -->
  </div>
</template>

<script>
import { detailCase, brief, updateCase } from '@/api/case/case.js'
import { formatDate } from '@/utils/format.js'
import { getMediater, getMediaterUser } from '@/api/mediater/mediater.js'
import editBtn from '@/components/button/editButton'
import { PROCESSMAP } from '@/utils/constVal.js'
export default {
  data() {
    return {
      detailCaseData: {}, // 案件详情
      aboutPropertyOptions: [
        // 是否涉及财产
        {
          value: '',
          label: '请选择'
        },
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      value: '',
      isEdit: false, // 是否出去编辑状态
      value1: null,
      briefData: [], // 案由
      editCaseDetail: {}, // 编辑案件信息用到的参数
      mediaterData: [], // 调解机构数据
      mediaterUserData: [], // 调解人员数据
      selectmediaterId: '', // 选择的调解机构ID
      processTypeData: [] //进度类型数据
    }
  },
  components: {
    editBtn
  },
  props: {
    caseId: null
  },
  created() {
    this.getCaseDetail()
    this.getBrief()
    this.getMediater()
    this.getProcessType()
  },
  mounted() {},
  methods: {
    // 获取案件详情
    getCaseDetail() {
      detailCase({ lawCaseId: this.caseId }).then(res => {
        this.detailCaseData = res.lawCase
        this.detailCaseData.processChar =
          PROCESSMAP[this.detailCaseData.process]
        this.editCaseDetail = {
          caseId: this.caseId, //案件id （无值为新增，有为修改）
          dCaseNo: res.lawCase.dCaseNo, //登字号
          sqCaseNo: res.lawCase.sqCaseNo, //调解号
          briefId: res.lawCase.brief.id || '', //案由id
          isAboutProperty: res.lawCase.aboutProperty, //是否涉及财产 ture/false
          applyStandard: res.lawCase.applyStandard, //申请标的
          caseSource: res.lawCase.caseSource, //纠纷来源
          registerCourtId: '', //审核/登记机构id
          mediateCourtId: res.lawCase.court.id || '', //受理/调解机构id
          mediaterId: res.lawCase.mediater.id || '', //调解人员id
          registerDate: formatDate(res.lawCase.registerDate), //审核登记日期
          mediateTerm: formatDate(res.lawCase.registerDate), //调解限期
          process: res.lawCase.process, //案件进度
          mediateRequest: res.lawCase.mediateRequest, //诉讼请求
          reason: '' //事实与理由
        }
      })
    },
    // 编辑事件
    edit() {
      this.isEdit = true
    },
    // 返回事件
    back() {
      this.isEdit = false
    },
    // 保存事件
    save() {
      updateCase(this.editCaseDetail).then(res => {
        console.log(res)
      })
      this.isEdit = false
    },
    // 取消事件
    cancel() {
      this.isEdit = false
    },
    // 获取案由
    getBrief() {
      // 把pageSize设大用于做select的数据
      brief({ pageSize: 1000 }).then(res => {
        this.briefData = res.briefPage.content
      })
    },
    // 获取调解机构
    getMediater() {
      getMediater({ pageSize: 1000 }).then(res => {
        this.mediaterData = res.content
      })
    },
    // 获取调解人员
    getMediaterUser() {
      getMediaterUser({ courtId: this.selectmediaterId, pageSize: 1000 }).then(
        res => {
          console.log('---------调解人员-------')
          console.log(res)
        }
      )
    },
    // 选择调解机构触发
    selectMeduater(id) {
      this.selectmediaterId = id
      this.getMediaterUser()
    },
    // 获取进度类型数据
    getProcessType() {
      for (let key in PROCESSMAP) {
        this.processTypeData.push({
          value: parseInt(key),
          label: PROCESSMAP[key]
        })
      }
      console.log('-----进度------')
      console.log(this.processTypeData)
    }
  }
}
</script>

<style scoped lang="scss">
.form-table {
  grid-template-columns: repeat(4, 120px 1fr);
}
.header {
  margin-bottom: 30px;
  > span {
    font-size: 16px;
    color: #464a53;
  }
}
</style>
