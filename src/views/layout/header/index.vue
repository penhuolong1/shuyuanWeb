<template>
  <div>
    <div id="header">
      <div class="header-inner">
        <div class="icon-wrapper">
          <i class="el-icon-setting"></i>
          <i class="el-icon-bell"></i>
          <span class="number">3</span>
        </div>
        <div class="info-wrapper">
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="info-inner">
                <div class="avator">
                  <img
                    src="../../../assets/logo.png"
                    alt=""
                  >
                </div>
                <div class="info">
                  <div class="name">{{userInfo.roleName}}</div>
                  <div class="role">{{userRole}}</div>
                </div>
                <div class="icon">
                  <i class="el-icon-caret-bottom info-icon"></i>
                </div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="clickdropdown">黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ROLEMAP } from '@/utils/constVal'
export default {
  data() {
    return {
      userInfo: null,
      userRole: null
    }
  },
  mounted() {},
  created() {
    this.getInfo()
  },
  methods: {
    //退出登录
    async logout() {
      await this.$store.dispatch('LogOut')
      this.$router.push(`/login`)
    },
    clickdropdown() {
      console.log(123)
    },
    // 获取用户信息
    getInfo() {
      this.userInfo = this.getUserInfo
      let roleType = this.userInfo.roleType
      this.userRole = ROLEMAP[roleType]
      console.log('---------------')
      console.log(ROLEMAP)
      console.log(this.userRole)
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#header {
  max-height: 90px;
  line-height: 90px;
  height: 90px;
  width: 100%;
  .header-inner {
    text-align: right;
    > div {
      display: inline-block;
    }
    .icon-wrapper {
      position: relative;
      i {
        font-size: 25px;
        color: #131026;
        text-align: center;
        margin-right: 30px;
        position: relative;
        top: 5px;
      }
      .number {
        position: absolute;
        display: inline-block;
        width: 18px;
        height: 18px;
        background-color: #ec4c4d;
        color: #fff;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        right: 25px;
        top: 23px;
      }
    }
    .el-dropdown {
      top: 20px;
    }
    .info-inner {
      display: flex;
      height: 50%;
      line-height: 50%;
      .avator {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        height: 50px;
        text-align: left;
        margin-right: 20px;
        .name {
          font-size: 15px;
          color: #131026;
          line-height: 37px;
          height: 30px;
        }
        .role {
          font-size: 12px;
          color: #6c708c;
          line-height: 12px;
          height: 12px;
        }
      }
      .icon {
        line-height: 50px;
      }
      .info-icon {
        margin-right: 10px !important;
        font-size: 20px;
      }
    }
  }
}
</style>
