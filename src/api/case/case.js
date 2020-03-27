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
  return service({
    url: "/web/case/updateCaseInfo.jhtml",
    method: "POST",
    data: params
  });
}

// 查询案件调解协议/证据信息/当事人信息
export function protocol(params) {
  return service({
    url: "/court/protocol/getProtocolByCaseId.jhtml",
    method: "GET",
    params
  });
}

/**
 * 上传证据
 * @param {Object}} params 
 * litigantId 当事人Id
 * evidenceName 证据名称
 * objectOfProof 证明对象
 * urls 多个地址都好隔开
 */
export function addEvidence(params) {
  return service({
    url: "/court/evidence/addEvidence.jhtml",
    method: "POST",
    data: params
  });
}

/**
 * 上传图片
 * file 图片文件
 */
export function uploadImg(param) {
  return service({
    url: "/court/wxRegister/uploadFrontImage.jhtml",
    method: "POST",
    header: {
      "Content-Type": "multipart/form-data"
    },
    name: 'file',
    data:param
  });
}
