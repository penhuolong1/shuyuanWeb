<template>
  <div class="evidence-wrapper">
    <div class="title">纠纷概况</div>
    <div class="header">
      <titleIcon :titleText="titleText"></titleIcon>
      <div class="header-right">
        <span>证据信息</span>
        <editBtn
          @edit="edit"
          @save="save"
          @add="add"
          @cancel="cancel"
          @del="del"
          :isNeedAdd="true"
        ></editBtn>
      </div>
    </div>
    <div
      class="content"
      v-for="(item, index) in evidenceDataInfo"
      :key="index"
    >
      <div class="content-left">
        <div
          class="text-wrapper"
          v-if="!isEditData"
        >
          <div class="title">证据序号{{index+1}}</div>
          <div class="text">{{item.imgUrls.length}}份</div>
          <div class="title">证据名称</div>
          <div class="text">{{item.evidenceName}}</div>
          <div class="title">证明对象</div>
          <div class="text">{{item.objectOfProof}}</div>
          <div class="title">证据来源</div>
          <div class="text">当事人提供</div>
          <div class="title">份数</div>
          <div class="text">1份</div>
        </div>
        <div
          class="edit-wrapper"
          v-if="isEditData"
        >
          <div class="title">证据序号1</div>
          <div class="text">
            <el-input
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div class="title">证据名称</div>
          <div class="text">
            <el-input
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div class="title">证据来源</div>
          <div class="text">
            <el-input
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div class="title">份数</div>
          <div class="text">
            <el-input
              v-model="input"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="content-right">
        <meterials
          :isEdit="isEditData"
          :imgUrls="item.imgUrls"
        ></meterials>
      </div>
    </div>
  </div>
</template>

<script>
import editBtn from '@/components/button/editButton'
import titleIcon from '@/components/styleIcon/titleIcon'
import meterials from '@/components/materials/materials'
export default {
  data() {
    return {
      titleText: '证',
      input: '',
      isEditData: false,
      evidenceDataInfo: null // 接收证据信息
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      value: false
    },
    evidenceData: null
  },
  watch: {
    evidenceData: {
      handler() {
        this.getEvidenceDataInfo()
      },
      deep: true
    },
    watch() {
      this.isEditData = this.isEdit
    }
  },
  components: {
    editBtn,
    titleIcon,
    meterials
  },
  created() {
    this.isEditData = this.isEdit
    this.getEvidenceDataInfo()
  },
  mounted() {},
  methods: {
    edit() {
      this.isEditData = true
    },
    save() {
      this.isEditData = false
    },
    add() {
      this.isEditData = false
    },
    del() {
      this.isEditData = false
    },
    cancel() {
      this.isEditData = false
    },
    // 翻译证据数据
    getEvidenceDataInfo() {
      this.evidenceDataInfo = JSON.parse(JSON.stringify(this.evidenceData))
      // if (this.evidenceDataInfo && this.evidenceDataInfo.length > 0) {
      //   this.evidenceDataInfo.forEach(item => {
      //     if (item.evidenceAttachments && item.evidenceAttachments.length > 0) {
      //       item.imgUrls = []
      //       item.evidenceAttachments.forEach(item1 => {
      //         item.imgUrls.push(item1.url)
      //       })
      //     }
      //   })
      // }
      console.log('证据信息')
      if (this.evidenceDataInfo && this.evidenceDataInfo.length > 0) {
        this.evidenceDataInfo.forEach(item => {
          item.imgUrls = []
          if (item.evidenceAttachments && item.evidenceAttachments.length > 0) {
            item.evidenceAttachments.forEach(item1 => {
              item.imgUrls.push(item1.url)
            })
          }
        })
      }
      console.log(this.evidenceDataInfo)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.evidence-wrapper {
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
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    display: flex;
    .content-left {
      width: 300px;
      padding-right: 20px;
      border-right: 1px solid #b9bed3;
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
