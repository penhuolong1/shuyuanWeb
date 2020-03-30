<template>
  <div class="dispute-wrapper">
    <div class="title">纠纷概况</div>
    <div class="header">
      <titleIcon :titleText="titleText"></titleIcon>
      <div class="header-right">
        <span>请求、事实与理由</span>
        <editBtn
          @edit="edit"
          @save="save"
          @cancel="cancel"
        ></editBtn>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <div
          class="text-wrapper"
          v-if="!isEditData"
        >
          <div class="title">请求事项</div>
          <div class="text"><span v-if="disputeInfoData.mediateRequest">{{disputeInfoData.mediateRequest}}</span>
          </div>
          <div class="title">事实与理由</div>
          <div class="text"><span v-if="disputeInfoData.reason">{{disputeInfoData.reason}}</span>
          </div>
        </div>
        <div
          class="edit-wrapper"
          v-if="isEditData"
        >
          <div class="title">请求事项</div>
          <div class="text">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="params.mediateRequest"
            >
            </el-input>
          </div>
          <div class="title">事实与理由</div>
          <div class="text">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="params.reason"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editBtn from '@/components/button/editButton'
import titleIcon from '@/components/styleIcon/titleIcon'
import { addCase } from '@/api/case/case.js'
export default {
  data() {
    return {
      titleText: '纠',
      textarea2: '',
      disputeInfoData: {
        mediateRequest: '',
        reason: ''
      }, // 接收纠纷部分信息
      params: {
        // 提交参数
        mediateRequest: '',
        reason: ''
      },
      isEditData: false //接收isEdit
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      value: false
    },
    disputeInfo: null, //获取纠纷的信息
    caseId: null, //案件ID
    countId: null // 机构ID
  },
  components: {
    editBtn,
    titleIcon
  },
  watch: {
    disputeInfo() {
      this.disputeInfoData = {
        mediateRequest: '',
        reason: ''
      }
      this.params = {
        mediateRequest: '',
        reason: ''
      }
      this.disputeInfoData = this.disputeInfo
      this.params = this.disputeInfo
      console.log('--disputeInfoData----')
      console.log(this.disputeInfoData)
    },
    isEdit() {
      this.isEditData = this.isEdit
    },
    countId() {
      console.log('--机构ID2----')
      console.log(this.countId)
    }
  },
  created() {
    this.disputeInfoData = {
      mediateRequest: '',
      reason: ''
    }
    this.params = {
      mediateRequest: '',
      reason: ''
    }
    this.disputeInfoData = this.disputeInfo
    this.params = this.disputeInfo
    this.isEditData = this.isEdit
  },
  mounted() {},
  methods: {
    edit() {
      this.isEditData = true
    },
    save() {
      this.params.lawCaseId = this.caseId
      this.params.courtId = this.countId
      addCase(this.params).then(res => {
        if (res.state == 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.isEditData = false
        }
      })
    },
    cancel() {
      this.isEditData = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.dispute-wrapper {
  .header {
    line-height: 30px;
    height: 30px;
    .header-right {
      display: inline-block;
      vertical-align: top;
      color: #abafb3;
    }
    margin-bottom: 30px;
    margin-top: 30px;
  }
  margin-top: 50px;
  .title {
    font-size: 22px;
    color: #464a53;
  }
  .content {
    padding: 20px;
    display: flex;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    .content-left {
      flex: 1;
      padding-right: 20px;
      .text-wrapper,
      .edit-wrapper {
        .title {
          color: $themeColor;
          font-size: 16px;
          font-weight: bold;
        }
        .text {
          margin: 20px 0 20px 30px;
          line-height: 1.5;
          color: #131026;
        }
      }
    }
    .content-right {
      flex: 1;
      padding-left: 20px;
    }
  }
}
</style>
