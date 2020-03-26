<template>
  <div class="edit-btn-wrapper">
    <div
      class="edit-wrapper"
      v-if="!isEditData"
    >
      <span @click="edit">编辑</span>
      <span
        @click="back"
        v-if="isNeedBack"
      >返回</span>
    </div>
    <div
      class="save-wrapper"
      v-if="isEditData"
    >
      <span @click="save">保存</span>
      <span @click="cancel">取消</span>
    </div>
    <div
      class="add-wrapper"
      v-if="isNeedAdd"
    >
      <span @click="add">添加</span>
      <span @click="del">删除</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditData: false // 是否处于编辑状态
    }
  },
  props: {
    isEdit: {
      // 是否处于编辑状态
      type: Boolean,
      value: false
    },
    isNeedAdd: {
      // 是否需要添加按钮
      type: Boolean,
      value: false
    },
    isNeedBack: {
      // 是否需要返回按钮
      type: Boolean,
      value: false
    }
  },
  created() {},
  mounted() {},
  watch: {
    isEdit() {
      this.isEditData = this.isEdit
    }
  },
  methods: {
    // 把编辑事件传到父组件
    edit() {
      this.isEditData = true
      this.$emit('edit')
    },
    // 把返回事件传到父组件
    back() {
      this.isEditData = false
      this.$emit('back')
    },
    // 把保存事件传到父组件
    save() {
      this.isEditData = false
      this.$emit('save')
    },
    // 把取消事件传到父组件
    cancel() {
      this.isEditData = false
      this.$emit('cancel')
    },
    add() {
      this.$emit('add')
    },
    del() {
      this.$emit('del')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
.edit-btn-wrapper {
  display: inline;
  .edit-wrapper,
  .save-wrapper,
  .add-wrapper {
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
