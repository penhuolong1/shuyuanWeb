<template>
  <div>
    <!-- 详情部分 -->
    <div
      class="form-table"
      v-if="!isEdit"
    >
      <div class="item item-value border-right">{{personMap[personType]}}</div>
      <div class="item item-value item-style">
        <span>律师</span>
      </div>
      <div class="item item-key">姓名</div>
      <div class="item item-value border-right">
        <span>胡新</span>
      </div>
      <div class="item item-key">民族</div>
      <div class="item item-value">
        <span>汉族</span>
      </div>
      <div class="item item-key">性别</div>
      <div class="item item-value border-right">
        <span>男</span>
      </div>
      <div class="item item-key">年龄</div>
      <div class="item item-value">
        <span>30</span>
      </div>
      <div class="item item-value">{{personType != 2 ? '证件号码':'证件号码&律师职业证号'}}</div>
      <div class="item item-value item-style1">
        <span>350424199511231245</span>
      </div>
      <div class="item item-key">联系号码</div>
      <div class="item item-key item-style2">
        <span>13022122231</span>
      </div>
      <div class="item item-value">住址</div>
      <div class="item item-value item-style3">
        <span>福建省泉州是1是阿三打算</span>
      </div>
      <div class="item item-key">工作单位或职务</div>
      <div class="item item-key item-style4">
        <span>民工</span>
      </div>
    </div>
    <!-- 详情部分结束 -->

    <!-- 编辑部分 -->
    <div
      class="form-table"
      v-if="isEdit"
    >
      <div class="item item-value border-right">{{personMap[personType]}}</div>
      <div class="item item-value item-style">
        <el-select
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">姓名</div>
      <div class="item item-value border-right">
        <el-input
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="item item-key">民族</div>
      <div class="item item-value">
        <el-input
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="item item-key">性别</div>
      <div class="item item-value border-right">
        <el-select
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="item item-key">年龄</div>
      <div class="item item-value">
        <el-input
          v-model="input"
          type="number"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="item item-value">{{personType != 2 ? '证件号码':'证件号码&律师职业证号'}}</div>
      <div class="item item-value item-style1">
        <el-input
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="item item-key">联系号码</div>
      <div class="item item-key item-style2">
        <el-input
          v-model="input"
          type="number"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="item item-value">住址</div>
      <div class="item item-value item-style3">
        <el-input
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="item item-key">工作单位或职务</div>
      <div class="item item-key item-style4">
        <el-input
          v-model="input"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <!-- 编辑部分结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      isEdit: false,
      personMap: {
        1: '申请人',
        2: '代理人',
        3: '被申请人'
      }
    }
  },
  props: {
    personType: null // 添加人类型 1申请人 2代理人 3被申请人
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.form-table {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 120px 1fr);
  overflow: auto;
  border: 1px solid rgba(221, 223, 225, 1);
  .item {
    min-height: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #464a53;
    padding: 0 10px;
    border-bottom: 1px solid #dddfe1;
    &:nth-child(odd) {
      border-right: 1px solid #dddfe1;
    }
    &.border-right {
      border-right: 1px solid #dddfe1;
    }
    &.item-key {
      background-color: #fcf9fc;
      font-size: 14px;
    }
    &.item-style {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    &.item-style1 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 4;
      grid-row-end: 5;
    }
    &.item-style2 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 5;
      grid-row-end: 6;
    }
    &.item-style3 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 6;
      grid-row-end: 7;
    }
    &.item-style4 {
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 7;
      grid-row-end: 8;
    }
    &.item-value {
      min-width: 120px;
    }
  }
}
</style>
