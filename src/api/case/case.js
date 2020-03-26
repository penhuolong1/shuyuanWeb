import axiosConfig from "@/utils/axios.js";
// 创建正式用例接口基础配置
const service = axiosConfig.ajax();

// 案件列表接口
export function listCase(params) {
  return service({
    url: "/web/case/listCase.jhtml",
    method: "GET",
    params
  });
}

// 获取案件详情接口
export function detailCase(params) {
  return service({
    url: "/court/case/detailsCase.jhtml",
    method: "GET",
    params
  });
}

// 删除案件
export function delCase(params) {
  return service({
    url: "/court/case/deleteCase.jhtml",
    method: "GET",
    params
  });
}

// 获取案由
export function brief(params) {
  return service({
    url: "/court/case/getBrief.jhtml",
    method: "GET",
    params
  });
}

// 添加编辑案件
export function updateCase(params) {
  // let data = {}
  // if (params) {
  //   for (let key in params) {
  //     if (params.)
  //   }
  // }
  return service({
    url: "/web/case/updateCaseInfo.jhtml",
    method: "POST",
    data: params
  });
}
