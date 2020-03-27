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
          @cancel="cancel"
          :isEdit="isEdit"
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
          :isEdit="isEdit"
          :isCaseCenter="true"
          :index="index"
          :litigant="litigantData"
        ></personForm>
      </div>
      <div
        class="person-info-right"
        v-if="isShow"
      >
        <meterials
          :maxImgNum="2"
          :imgUrls="imgUrls"
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
      isShow: false
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
    litigant: null //组件传来的代理人信息
  },
  watch: {
    litigant() {
      this.getImgUrl()
    }
  },
  components: {
    personForm,
    titleIcon,
    editBtn,
    meterials
  },
  created() {
    this.litigantData = this.litigant
    this.getImgUrl()
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
      this.isEdit = true
    },
    cancel() {
      this.isEdit = false
    },
    getImgUrl() {
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
