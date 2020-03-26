<template>
  <div class="dispute-wrapper">
    <div class="title">纠纷概况</div>
    <div class="header">
      <titleIcon :titleText="titleText"></titleIcon>
      <div class="header-right">
        <span>请求、事实与理由</span>
        <editBtn></editBtn>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <div
          class="text-wrapper"
          v-if="!isEdit"
        >
          <div class="title">请求事项</div>
          <div class="text">要求被申请人胡新立即偿还欠款人民币200000元（大写：贰拾万元整）。
          </div>
          <div class="title">事实与理由</div>
          <div class="text">1. 杨伟江向天下行租车有限公司支付已到期未付租金946元；2.杨伟江向天下行租车有限公司支付逾期付款违约金（以946元为基数分别计算，自各到期应付款之日起计至实际付款之日止，按日千分之三的标准计算）；3.杨伟江向天下行租车有限公司支付违约责任19582.2元； 4.杨伟江支付违章罚款1000元及违章违约金3000元；5.杨伟江承担天下行租车有限公司收车费用2000元及为本案支出的律师费1150元。
          </div>
        </div>
        <div
          class="edit-wrapper"
          v-if="isEdit"
        >
          <div class="title">请求事项</div>
          <div class="text">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea2"
            >
            </el-input>
          </div>
          <div class="title">事实与理由</div>
          <div class="text">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea2"
            >
            </el-input>
          </div>
        </div>
      </div>
      <div class="content-right">
        <meterials></meterials>
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
      titleText: '纠',
      textarea2: ''
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      value: false
    }
  },
  components: {
    editBtn,
    titleIcon,
    meterials
  },
  created() {},
  mounted() {},
  methods: {}
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
