new Vue({
  el: "#app",
  data: {
    message: "2020單車選購清單",
    products: [
      {
        id: 1586934917210,
        unit: "台",
        category: "公路車",
        title: "Giant TCR",
        origin_price: 168000,
        price: 128000,
        description: "整合式低風阻能量補給系統",
        content: "為競賽而生的優越空氣動力效能",
        is_enabled: true,
        imageUrl:
          "https://images.unsplash.com/photo-1525379241313-7d584a5c09a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=646&q=80",
        options: {
          stars: 4,
          comments: "為競賽而生的顛峰之作",
        },
      },
      {
        id: 1196934918888,
        unit: "台",
        category: "三鐵車",
        title: "Canyon Speedmax CF SLX 9.0",
        origin_price: 271600,
        description: "同級最強規格",
        content: "成為全世界最快的三鐵車",
        price: 200000,
        is_enabled: false,
        imageUrl:
          "https://images.unsplash.com/photo-1516820612845-a13894592046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        options: {
          stars: 3,
          comments: "性價比最高之工藝品",
        },
      },
      {
        id: 1196934916666,
        unit: "台",
        category: "公路車",
        title: "Argon 18 gallium pro",
        origin_price: 275800,
        description: "為爬坡而生",
        content: "眾所皆知的環法車隊Astana所御用的系列車款",
        price: 168000,
        is_enabled: false,
        imageUrl:
          "https://images.unsplash.com/photo-1533993067574-2d5100bd88fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80",
        options: {
          stars: 5,
          comments: "完美的藝術品",
        },
      },
    ],
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
    addProduct(item) {
      item.id = Date.now();
      this.products.unshift(item);
      console.log(item);
      $("#productModal").modal("hide");
    },
    updateProduct(item) {
      this.products.forEach((x, i) => {
        if (x.id === item.id) {
          this.products.splice(i, 1, item);
        }
      });
      console.log(item);
      $("#productModal").modal("hide");
    },
    deleteProduct(item) {
      if (item.id) {
        this.products.forEach((x, i) => {
          if (x.id === item.id) {
            this.products.splice(i, 1);
          }
        });
        $("#deleteModal").modal("hide");
      }
    },
  },
});
