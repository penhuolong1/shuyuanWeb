<template>
  <!-- 上传图片组件 -->
  <div>
    <div class="mater-upload-wrapper">
      <div class="content">
        <img
          src="@/assets/img/materUpload.png"
          alt=""
          style="width: 115px;height: 95px;"
        >
        <div class="tip">png、jpg、doc&pdf最大10MB</div>
        <div class="title">身份证明材料复印件上传</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    maxImgNum: null, //最大上传图片数
    imgUrls: null, // 父组件传来的图片数据
    isEdit: {
      type: Boolean,
      value: false
    } // 是否编辑状态
  },
  components: {},
  created() {
    console.log('图片地址')
    console.log(this.imgUrls)
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.mater-upload-wrapper {
  width: 100%;
  height: 350px;
  border: 1px dashed $themeColor;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    text-align: center;
    .tip {
      font-size: 12px;
      color: #8a92a5;
      margin-top: 5px;
    }
    .title {
      font-size: 16px;
      color: $themeColor;
      margin-top: 5px;
    }
  }
}
</style>
