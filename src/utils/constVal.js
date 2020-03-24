//全局常量文件
const SYS_NAME = "SHUYUAN-sys";
const ROLEMAP = { //角色类型map
  1: "调解机构",
  2: "调解员"
}
const PROCESSMAP = { // 案件进程map
  0: "未申请",
  1: "已申请",
  2: "已受理", 
  3: "已分发", 
  4: "已分配",
  5: "调解中",
  6: "待调解", //（弃用）
  7: "生成调解协议（待签字）", 
  8: "调解成功（已签字）",
  9: "不受理"
}
export {
  SYS_NAME,
  ROLEMAP,
  PROCESSMAP
};
