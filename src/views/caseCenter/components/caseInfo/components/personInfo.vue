<template>
  <div>
    <div class="header">
      <titleIcon :titleText="titleMap[personType]"></titleIcon>
      <div class="header-right">
        <span>{{headText}}</span>
        <editBtn
          :isNeedAdd="true"
          @add="add"
          @save="save"
          @del="del"
          @edit="edit"
          @cancel="cancel"
          :isEdit="isEditData"
        ></editBtn>
      </div>
    </div>
    <div class="person-info">
      <div
        class="person-info-left"
        v-if="litigantData"
      >
        <personForm
          :personType="personType"
          :isEdit="isEditData"
          :isCaseCenter="true"
          :index="index"
          :litigant="litigantData"
          ref="personForm"
        ></personForm>
      </div>
      <div
        class="person-info-right"
        v-if="isShow"
      >
        <meterials
          :isEdit="isEditData"
          :maxImgNum="2"
          :imgUrls="imgUrls"
          ref="uploadImg"
        ></meterials>
      </div>
    </div>
  </div>
</template>

<script>
import editBtn from '@/components/button/editButton'
import titleIcon from '@/components/styleIcon/titleIcon'
import personForm from '@/components/form/personForm'
import meterials from '@/components/materials/materials'
import { IDENTITYMAP, SEXMAP } from '@/utils/constVal.js'
import { addLitigant, editLitigant, selectLitigant } from '@/api/case/case.js'
export default {
  data() {
    return {
      titleMap: {
        1: '申',
        2: '代',
        3: '被'
      },
      headTextMap: {
        1: '申请人',
        2: '代理人',
        3: '被申请人'
      },
      litigantData: null, //接收受理人数据
      imgUrls: [],
      isShow: false,
      isEditData: false // 接收父组件传来的isEdit
    }
  },
  props: {
    personType: null, // 添加人类型 1申请人 2代理人 3被申请人
    headText: null,
    isEdit: {
      type: Boolean,
      value: false
    },
    caseId: null, //案件ID
    index: null, //表示当前为第几个受理人
    litigant: null //组件传来的代理人信息
  },
  watch: {
    litigant() {
      this.litigantData = [
        {
          name: '申请人',
          data: {}
        }
      ]
      this.litigantData = this.litigant
      this.getImgUrl()
    },
    isEdit() {
      this.isEditData = this.isEdit
    }
  },
  components: {
    personForm,
    titleIcon,
    editBtn,
    meterials
  },
  created() {
    this.litigantData = null
    this.litigantData = this.litigant
    this.getImgUrl()
    this.isEditData = this.isEdit
  },
  mounted() {},
  methods: {
    add() {
      this.$emit('add')
    },
    save() {
      this.$emit('save')
      let params = this.$refs.personForm.paramsData
      let imgParams = this.$refs.uploadImg.imgsUrlData
      if (imgParams && imgParams.length > 0) {
        params.frontImage = imgParams[0] || null
        params.backImage = imgParams[1] || null
      }
      if (this.litigantData.id) {
        params.litigantId = this.litigantData.id
        this.editLitigant(params)
      } else {
        params.lawCaseId = this.caseId
        if (this.personType == 1) {
          params.litigationStatus = 4
        } else if (this.personType == 3) {
          params.litigationStatus = 5
        }
        this.addLitigant(params)
      }
    },
    del() {
      this.$emit('del')
      console.log('---删除---')
    },
    edit() {
      this.isEditData = true
    },
    cancel() {
      this.isEditData = false
    },
    getImgUrl() {
      this.imgUrls = []
      if (!this.litigantData) {
        this.imgUrls = []
        return
      }
      if (this.litigantData.frontImage) {
        this.imgUrls.push(this.litigantData.frontImage)
      }
      if (this.litigantData.backImage) {
        this.imgUrls.push(this.litigantData.backImage)
      }
      this.isShow = true
    },
    // 修改当事人
    editLitigant(params) {
      editLitigant(params).then(res => {
        if (res.state == 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.selectLitigant(params.litigantId)
          this.isEditData = false
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 添加当事人
    addLitigant(params) {
      addLitigant(params).then(res => {
        if (res.state == 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.selectLitigant(res.litigantId)
          this.isEditData = false
        }
      })
    },
    selectLitigant(id) {
      selectLitigant({ litigantId: id }).then(res => {
        let data = JSON.parse(JSON.stringify(res.litigant))
        this.litigantData = data
        this.litigantData.typeChar = IDENTITYMAP[data.identityType]
        this.litigantData.name = data.litigantName
        this.litigantData.sex = SEXMAP[data.litigantSex]
        this.litigantData.phone = data.litigantPhone
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.person-info {
  display: flex;
  .person-info-left,
  .person-info-right {
    flex: 1;
  }
  .person-info-left {
    padding-right: 20px;
  }
  .person-info-right {
    padding-left: 20px;
  }
}
</style>
