<template>
  <div class="tab-wrapper">
    <div
      class="tab-item"
      v-for="(item, index) in tabData"
      :key="index"
      :class="{active: index === tabIndex}"
      @click="selectTab(index)"
    ><span>{{item.name}}</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0
    }
  },
  props: {
    tabData: null
  },
  created() {},
  mounted() {},
  methods: {
    selectTab(index) {
      this.tabIndex = index
      this.$emit('selectTab', index)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.tab-wrapper {
  width: 100%;
  height: 45px;
  line-height: 45px;
  display: flex;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  .tab-item {
    &.active {
      background-color: $themeColor;
      color: #fff;
      border-radius: 15px 15px 0 0;
    }
    width: 135px;
    color: #131026;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    span {
      display: inline-block;
      margin-top: 3px;
    }
  }
}
</style>
