import {SYS_NAME} from "@/utils/constVal";
let app = SYS_NAME;
let caseName = app + "-case-data";
const case1 = {
  state: {
    caseData: localStorage.getItem(caseName)
    ? JSON.parse(localStorage.getItem(caseName))
    : "" // 案件信息详情 
  },
  mutations: {
    //保存案件信息
    SET_CASEDATA: (state, casedata) => {
      localStorage.setItem(caseName, JSON.stringify(casedata))
      state.caseData = casedata;
    }
  },
  getters: {
    getCaseData: state => state.caseData, //获取用户个人信息
  },
  actions: {
    
  }
};
export default case1;
