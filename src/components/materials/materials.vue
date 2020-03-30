<template>
  <!-- 上传图片组件 -->
  <div class="upload-wrapper">
    <input type="file"
           ref="file"
           style="display:none;"
           @change="getFile($event)">
    <div class="mater-upload-wrapper">
      <div class="content image-show-wrapper"
           v-if="isEdit">
        <div class="upload-content"
             v-if="imgsUrlData.length < maxImgNum"
             @click="uploadImg()">
          <img src="@/assets/img/materUpload.png"
               alt=""
               style="width: 115px;height: 95px;">
          <div class="tip">png、jpg、doc&pdf最大10MB</div>
          <div class="title">身份证明材料复印件上传</div>
        </div>
        <div class="img-wrapper"
             v-for="(item, index) in imgsUrlData"
             :key="index">
          <img :src="item" />
          <div class="del-icon">
            <i class="el-icon-error"></i>
          </div>
        </div>
      </div>
      <div class="image-show-wrapper"
           v-if="!isEdit">
        <div class="no-img"
             v-if="!imgsUrlData || imgsUrlData.length == 0">(暂无文件)</div>
        <div class="img-wrapper"
             v-for="(item, index) in imgsUrlData"
             :key="index">
          <img :src="item" />
          <div class="del-icon">
            <i class="el-icon-error"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/case/case.js'
export default {
  data () {
    return {
      imgsUrlData: [] // 接收组件传过来的图片地址
    }
  },
  props: {
    maxImgNum: null, //最大上传图片数
    imgUrls: null, // 父组件传来的图片数据
    isEdit: {
      type: Boolean,
      value: false
    }
  },
  watch: {
    imgUrls: {
      handler () {
        this.imgsUrlData = this.imgUrls
      },
      deep: true
    }
  },
  components: {},
  created () {
    this.imgsUrlData = this.imgUrls
  },
  mounted () { },
  methods: {
    uploadImg () {
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    getFile (e) {
      let file = e.target.files[0]
      let param = new FormData() //创建form对象
      param.append('file', file) //通过append向form对象添加数据
      uploadImg(param).then(res => {
        if (res.state === 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.imgsUrlData.push(res.url)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
.upload-wrapper {
  height: 100%;
}
.mater-upload-wrapper {
  width: 100%;
  height: 100%;
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
  .image-show-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .no-img {
      font-size: 20px;
      color: #bababa;
    }
    .upload-content {
      flex: 1;
    }
    .img-wrapper {
      flex: 1;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      padding: 10px;
      position: relative;
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
      img {
        width: 100%;
      }
      .del-icon {
        position: absolute;
        text-align: center;
        bottom: 40px;
        i {
          color: #ec4c4d;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
