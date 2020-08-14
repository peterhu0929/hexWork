// import pagination from "./pagination.js";
// import modal from "./modal.js";
import zh_TW from "./zh_TW.js";
// 自定義設定檔案，錯誤的 className
VeeValidate.configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
});
// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);

// 註冊在Vue的藍圖、原型
// Vue.use(VueLoading);
Vue.component("loading", VueLoading);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

new Vue({
  el: "#app",
  data: {
    message: "表單驗證",
    user: {
      email: "",
      password: "",
    },
    userData: {
      apiPath: "https://course-ec-api.hexschool.io/",
      uuid: "ffbdeffe-575b-496a-aa39-71b48c4fe29d",
      token: "",
    },
    formData: {
      userName: "",
      email: "",
      phone: "",
      address: "",
      type: "",
      remark: "",
    },
    productsPagination: {},
    metaProduct: {
      imageUrl: [],
    },
    isLoading: false,
  },
  created() { },
  methods: {
    test() {
      console.log("test");
    },
  },
});
