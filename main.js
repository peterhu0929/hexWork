new Vue({
  el: "#app",
  data: {
    message: "2020六角學院實戰班主線任務",
    metaProduct: {},
  },
  methods: {
    openModal(action, item) {
      switch (action) {
        case "isAdd": {
          this.metaProduct = {};
          $("#productModal").modal("show");
          break;
        }
        case "isEdit": {
          this.metaProduct = JSON.parse(JSON.stringify(item));
          $("#productModal").modal("show", item);
          break;
        }
        case "isDelete": {
          this.metaProduct = JSON.parse(JSON.stringify(item));
          $("#deleteModal").modal("show");
          break;
        }
        case "isOptions":{
           this.metaProduct = JSON.parse(JSON.stringify(item));
           $("#optionsModal").modal("show");
           break;
        }
        default:
          break;
      }
    },
  },
});
