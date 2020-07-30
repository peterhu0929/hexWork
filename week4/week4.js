import pagination from './pagination.js';
import modal from './modal.js';

Vue.component("pagination", pagination);
Vue.component("modal", modal);

new Vue({
    el: "#app",
    data: {
        message: "",
        user: {
            email: "",
            password: "",
        },
        userData: {
            apiPath: "https://course-ec-api.hexschool.io/",
            uuid: "ffbdeffe-575b-496a-aa39-71b48c4fe29d",
            token: "",
        },
        products: [],
        productsPagination: {},
        metaProduct: {
            imageUrl: []
        },
    },
    created() {
        this.userData.token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        // 預設帶入 token
        axios.defaults.headers.common.Authorization = `Bearer ${this.userData.token}`;
        if (this.userData.token === "") {
            window.location = "./Login.html";
        } else {
            this.getData();
        }
    },
    methods: {
        signIn() {
            // console.log(this.user);
            const apiURL = `https://course-ec-api.hexschool.io/api/auth/login`;
            axios
                .post(apiURL, this.user)
                .then((res) => {
                    const token = res.data.token;
                    const expired = res.data.expired;
                    this.userData.uuid = res.data.uuid;
                    console.log(res.data.uuid);
                    // write cookie & expire date
                    document.cookie = `token=${token};expires=${new Date(
            expired * 1000
          )}; path=/`;
                    window.location = "./product.html";
                })
                .catch((error) => {
                    alert(error);
                });
        },
        openModal(action, item) {
            switch (action) {
                case "isAdd":
                    {
                        this.metaProduct = { imageUrl: [] };
                        $("#productModal").modal("show");
                        break;
                    }
                case "isEdit":
                    {
                        const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/admin/ec/product/${item.id}`;
                        axios.get(apiURL).then((res) => {
                            this.metaProduct = res.data.data,
                                $("#productModal").modal("show");
                        });
                        break;
                    }
                case "isDelete":
                    {
                        this.metaProduct = JSON.parse(JSON.stringify(item));
                        $("#deleteModal").modal("show");
                        break;
                    }
                case "isOptions":
                    {
                        this.metaProduct = JSON.parse(JSON.stringify(item));
                        $("#optionsModal").modal("show");
                        break;
                    }
                default:
                    break;
            }
        },
        getData(num = 1) {
            console.log(num);
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/admin/ec/products?page=${num}`;
            axios.get(apiURL).then((res) => {
                this.products = res.data.data;
                this.productsPagination = res.data.meta.pagination;
                if (this.metaProduct) {
                    this.metaProduct = { imageUrl: [] };
                    $("#productModal").modal("hide");
                }
            });
        },
        deleteProduct(item) {
            if (item.id) {
                const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/admin/ec/product/${item.id}`;
                axios.delete(apiURL, item.id).then((res) => {
                    console.log(res);
                    this.getData();
                    $("#deleteModal").modal("hide");
                });

            }
        },
    },
});