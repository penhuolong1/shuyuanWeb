import {SYS_NAME} from "@/utils/constVal";
import {userInfo} from '@/api/user/user'
let app = SYS_NAME;
let user_Info = app + "-userInfo";
let user_role = app + "-userRole"
const user = {
  state: {
    userRole: localStorage.getItem(user_role)
    ? JSON.parse(localStorage.getItem(user_role))
    : "", // 用户角色
    userInfo: localStorage.getItem(user_Info)
      ? JSON.parse(localStorage.getItem(user_Info))
      : "" //用户个人信息
  },
  mutations: {
    //保存用户个人信息
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_USERROLE: (state, role) => {
      state.userRole = role;
    },
  },
  getters: {
    getUserInfo: state => state.userInfo, //获取用户个人信息
    getUserRole: state => state.userRole //获取用户个人角色
  },
  actions: {
    GetUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        userInfo().then(res => {
          if (res.state == 100) {
            const data = res
            localStorage.setItem(user_Info, JSON.stringify(data))
            commit("SET_USERINFO", data)
          } else {
            localStorage.removeItem(user_Info)
            localStorage.removeItem(user_role)
          }
          resolve(res)
        })
      })
    }
  }
};
export default user;
