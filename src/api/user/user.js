import axiosConfig from "@/utils/axios.js";
// 创建正式用例接口基础配置
const service = axiosConfig.ajax();

//用户登录
export const login = params => {
  return service({
    url: "/main/login.jhtml",
    method: "post",
    params
  });
}

// 查看用户信息
export const userInfo = () => {
  return service({
    url: "/main/getUserInfo.jhtml",
    method: "get"
  });
}
