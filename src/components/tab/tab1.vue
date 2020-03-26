<template>
  <div class="tab-wrapper tab1">
    <div
      class="tab1-item"
      v-for="(item, index) in menuData"
      :key="index"
      :class="{active: menuIndex == index}"
      @click="selectMenu(index)"
    ><span>{{item.name}}</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuIndex: 0
    }
  },
  props: {
    menuData: null
  },
  created() {},
  mounted() {},
  methods: {
    selectMenu(index) {
      this.menuIndex = index
      this.$emit('selectMenu', index)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';

.tab-wrapper.tab1 {
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  div {
    width: 150px;
    text-align: center;
    &.active {
      span {
        font-weight: bold;
        border-bottom: 2px solid $themeColor;
        padding: 0 5px;
        padding-bottom: 12px;
      }
    }
    span {
      color: #2c2c2c;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
