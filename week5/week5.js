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

Vue.filter('currency', function(value) {
    var parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + parts.join('.');
});
Vue.filter('date4View', function(value) {
    const pDate = new Date(value);
    return `${pDate.getFullYear()}/${pDate.getMonth() + 1}/${pDate.getUTCDate()}`;
});
new Vue({
    el: "#app",
    data: {
        message: "表單驗證&購物車",
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
            name: "",
            email: "",
            tel: "",
            address: "",
            payment: "",
            remark: ""
        },
        paymentMethods: [{
                name: "WebATM",
            },
            {
                name: "ATM",
            },
            {
                name: "Barcode",
            },
            {
                name: "Credit",
            },
            {
                name: "ApplePay",
            },
            {
                name: "GooglePay",
            },
        ],
        metaProduct: {
            imageUrl: [],
        },
        isLoading: false,
        status: {
            loadingItem: '',
        },
        products: [],
        cart: {},
        cartTotal: 0,
        orderTime: Date
    },
    created() {
        this.getProducts();
        this.getCart();
    },
    methods: {
        submitForm(inputData) {
            console.log(inputData);
            this.isLoading = true;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/orders`;
            axios.post(apiURL, inputData).then(res => {
                console.log(res);
                this.isLoading = false;
                this.orderTime = new Date();
                $('#orderModal').modal("show");
                this.getCart();
            }).catch(error => {
                this.isLoading = false;
                alert(error.response.data.errors);
            });
        },
        getProducts(num = 1) {
            this.isLoading = true;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/products?page=${num}`;
            axios.get(apiURL).then((res) => {
                this.products = res.data.data;
                // this.productsPagination = res.data.meta.pagination;
                if (this.metaProduct) {
                    this.metaProduct = {
                        imageUrl: []
                    };
                    $("#productModal").modal("hide");
                }
                this.isLoading = false;
            }).catch((err) => { this.isLoading = false });
        },
        getDetailed(id) {
            // this.isLoading = true;
            this.status.loadingItem = id;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/product/${id}`;
            axios.get(apiURL).then((res) => {
                // this.metaProduct = res.data.data;
                // this.metaProduct.num = 1;
                // this.$set(this.metaProduct, 'num', 1);

                //ES6
                this.metaProduct = {
                    ...res.data.data,
                    num: 1
                };
                $("#productModal").modal("show");
                this.status.loadingItem = null;
            });
        },
        getCart() {
            this.isLoading = true;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/shopping`;
            axios.get(apiURL).then((res) => {
                this.cart = res.data.data;
                this.updateCartTotal();
                this.isLoading = false;
            });
        },
        add2Cart(productID, quantity = 1) {
            this.isLoading = true;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/shopping`;
            let selectProduct = {
                product: productID,
                quantity
            }
            axios.post(apiURL, selectProduct)
                .then(res => {
                    console.log(res);
                    this.isLoading = false;
                    $("#productModal").modal("hide");
                    this.getCart();
                })
                .catch(error => {
                    this.isLoading = false;
                    alert(error.response.data.errors);
                });
        },
        removeAllCartItem() {
            this.isLoading = true;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/shopping/all/product`;
            axios.delete(apiURL).then((res) => {
                console.log(res);
                this.isLoading = false;
                this.getCart();
            }).catch((err) => {
                alert(error.response.data.errors);
            });
        },
        removeCartItem(productID) {
            this.isLoading = true;
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/shopping/${productID}`;
            axios.delete(apiURL).then((res) => {
                console.log(res);
                this.isLoading = false;
                this.getCart();
            }).catch((err) => {
                alert(error.response.data.errors);
            });
        },
        updateQuantity(productID, quantity) {
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/ec/shopping`;
            let selectProduct = {
                product: productID,
                quantity
            }
            axios.patch(apiURL, selectProduct).then((res) => {
                console.log(res);
                this.getCart();
                // this.updateCartTotal();
            }).catch((err) => {
                alert(error.response.data.errors);
            });
        },
        updateCartTotal() {
            let total = 0;
            if (this.cart.length > 0) {
                this.cart.forEach(x => {
                    total += x.quantity * x.product.price;
                    this.cartTotal = total;
                });
            } else {
                this.cartTotal = 0
            }

        }
    },
});