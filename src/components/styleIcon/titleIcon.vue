<template>
  <div class="title-icon-wrapper">
    <div class="text">{{titleText}}</div>
    <div class="icon"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    titleText: null
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.title-icon-wrapper {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 15px;
  .text {
    position: absolute;
    width: 30px;
    height: 30px;
    color: #fff;
    border-radius: 50%;
    font-size: 16px;
    border: 1px solid #fff;
    background-color: $themeColor;
    text-align: center;
    line-height: 26px;
    z-index: 2;
    font-weight: 400;
  }
  .icon {
    position: absolute;
    border: 7px solid;
    border-color: transparent transparent transparent $themeColor;
    right: -11px;
    bottom: 8px;
    z-index: 1;
  }
}
</style>
