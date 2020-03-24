import axiosConfig from "@/utils/axios.js";
// 创建正式用例接口基础配置
const service = axiosConfig.ajax();

// 获取调解机构
export function getMediater(params) {
  return service({
    url: "/court/mediateter/getMediater.jhtml",
    method: "GET",
    params
  });
}

// 获取调解人员
export function getMediaterUser(params) {
  return service({
    url: "/court/mediateter/getMByCId.jhtml",
    method: "GET",
    params
  });
}
