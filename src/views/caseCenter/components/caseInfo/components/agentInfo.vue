<template>
  <div>
    <div class="header">
      <titleIcon :titleText="titleMap[personType]"></titleIcon>
      <div class="header-right">
        <span>{{headText}}</span>
        <editBtn
          :isNeedAdd="true"
          @add="add"
          @del="del"
          @edit="edit"
          @save="save"
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
        <lawyerForm
          :personType="personType"
          :isEdit="isEditData"
          :isCaseCenter="true"
          :index="index"
          :litigant="litigantData"
          :proposerInfo="proposerInfo"
          ref="lawyerForm"
        ></lawyerForm>
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
import lawyerForm from '@/components/form/lawyerForm'
import meterials from '@/components/materials/materials'
import { addLawyer } from '@/api/case/case.js'
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
    index: null, //表示当前为第几个受理人
    litigant: null, //组件传来的代理人信息
    proposerInfo: null //组件传过来的申请人信息
  },
  watch: {
    litigant() {
      this.litigantData = [
        {
          name: '代理人',
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
    lawyerForm,
    titleIcon,
    editBtn,
    meterials
  },
  created() {
    this.litigantData = [
      {
        name: '代理人',
        data: {}
      }
    ]
    this.litigantData = this.litigant
    this.getImgUrl()
    this.isEditData = this.isEdit
  },
  mounted() {},
  methods: {
    add() {
      this.$emit('add')
    },
    del() {
      this.$emit('del')
    },
    edit() {
      this.isEditData = true
    },
    cancel() {
      this.isEditData = false
    },
    save() {
      let params = JSON.parse(JSON.stringify(this.$refs.lawyerForm.paramsData))
      let imgParams = this.$refs.uploadImg.imgsUrlData
      if (imgParams && imgParams.length > 0) {
        params.frontImage = imgParams[0] || null
        params.backImage = imgParams[1] || null
      }
      if (params.years) {
        params.years = parseInt(params.years)
      }
      console.log('---传入的参数----')
      console.log(params)
      if (this.litigantData.id) {
        params.lawyerId = this.litigantData.id
        addLawyer(params).then(res => {
          if (res.state == 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.isEditData = false
          }
        })
      } else {
        addLawyer(params).then(res => {
          if (res.state == 100) {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'success'
            })
            this.isEditData = false
          }
        })
      }
    },
    getImgUrl() {
      if (!this.litigantData) {
        this.imgUrls = []
        return
      }
      this.imgUrls = []
      if (this.litigantData.frontImage) {
        this.imgUrls.push(this.litigantData.frontImage)
      }
      if (this.litigantData.backImage) {
        this.imgUrls.push(this.litigantData.backImage)
      }
      this.isShow = true
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
