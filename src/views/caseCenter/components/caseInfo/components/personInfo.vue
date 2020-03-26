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
        ></editBtn>
      </div>
    </div>
    <div class="person-info">
      <div class="person-info-left">
        <personForm :personType="personType"></personForm>
      </div>
      <div class="person-info-right">
        <meterials></meterials>
      </div>
    </div>
  </div>
</template>

<script>
import editBtn from '@/components/button/editButton'
import titleIcon from '@/components/styleIcon/titleIcon'
import personForm from '@/components/form/personForm'
import meterials from './materials'
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
      }
    }
  },
  props: {
    personType: null, // 添加人类型 1申请人 2代理人 3被申请人
    headText: null
  },
  components: {
    personForm,
    titleIcon,
    editBtn,
    meterials
  },
  created() {},
  mounted() {},
  methods: {
    add() {
      this.$emit('add')
    },
    del() {
      console.log('del')
      this.$emit('del')
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
