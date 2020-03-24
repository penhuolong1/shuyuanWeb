<template>
  <div class="edit-btn-wrapper">
    <div
      class="edit-wrapper"
      v-if="!isEdit"
    >
      <span
        class="edit"
        @click="edit"
      >编辑</span>
      <span
        class="back"
        @click="back"
      >返回</span>
    </div>
    <div
      class="save-wrapper"
      v-if="isEdit"
    >
      <span
        class="save"
        @click="save"
      >保存</span>
      <span
        class="cancel"
        @click="cancel"
      >取消</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    isEdit: {
      // 是否处于编辑状态
      type: Boolean,
      value: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 把编辑事件传到父组件
    edit() {
      this.isEdit = true
      this.$emit('edit')
    },
    // 把返回事件传到父组件
    back() {
      this.isEdit = false
      this.$emit('back')
    },
    // 把保存事件传到父组件
    save() {
      this.isEdit = false
      this.$emit('save')
    },
    // 把取消事件传到父组件
    cancel() {
      this.isEdit = false
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.edit-btn-wrapper {
  display: inline;
  .edit-wrapper,
  .save-wrapper {
    display: inline;
    span {
      cursor: pointer;
      color: $themeColor;
      font-size: 14px;
      display: inline-block;
      margin-left: 20px;
    }
  }
}
</style>
