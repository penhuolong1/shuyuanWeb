import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import user from "./modules/user";
import router from "./modules/router";
import app from "./modules/app";
import case1 from "./modules/case";

export default new Vuex.Store({
  modules: {
    case1,
    user,
    router,
    app
  }
});
