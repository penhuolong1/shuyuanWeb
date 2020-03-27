//全局常量文件
export const SYS_NAME = "SHUYUAN-sys";
export const ROLEMAP = { //角色类型map
  1: "调解机构",
  2: "调解员"
}
export const PROCESSMAP = { // 案件进程map
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
export const IDENTITYMAP = { //身份证类别：1.自然人-身份证；2法人-统一信用代码
  1: "自然人",
  2: "法人"
}
export const SEXMAP = { //性别类型 0男 1女
  0: "男",
  1: "女"
}
export const AGENTTYPEMAP = { //代理人类型
  1: "律师",
  2: "法律工作者",
  3: "单位工作人员",
  4: "近亲属",
  5: "公民"
}
export const LITIGATIONMAP = { //诉讼地位
  1: "原告", 
  2: "被告",
  3: "第三人",
  4: "申请人",
  5: "被申请人"
}
