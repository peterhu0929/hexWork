export default {
    template: `<div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div v-if="!metaProduct.id" class="modal-header bg-info">
                        <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
                    </div>
                    <div v-if="metaProduct.id" class="modal-header bg-warning">
                        <h5 class="modal-title" id="exampleModalLabel">編輯產品</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>輸入圖片網址</label>
                                    <input v-model="metaProduct.imageUrl[0]" type="text" class="form-control" placeholder="請輸入圖片連結" />
                                </div>
                                <img class="img-fluid" :src="metaProduct.imageUrl[0]" alt />
                            </div>
                            <div class="col-sm-8">
                                <div class="form-row">
                                    <div class="form-group col-sm-12">
                                        <label for="title">產品名稱</label>
                                        <input id="title" v-model="metaProduct.title" type="text" class="form-control" placeholder="請輸入名稱" />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-4">
                                        <label for="category">分類</label>
                                        <input id="category" v-model="metaProduct.category" type="text" class="form-control" placeholder="請輸入分類" />
                                    </div>

                                    <div class="form-group col-sm-4">
                                        <label for="unit">單位</label>
                                        <input id="unit" v-model="metaProduct.unit" type="text" class="form-control" placeholder="請輸入分類" />
                                    </div>
                                    <div class="form-group col-sm-4">
                                        <label for="enabled">啟用(Y/N)</label>
                                        <input id="enabled" v-model="metaProduct.enabled" type="checkbox" class="form-control" placeholder="是否啟用" />
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-sm-6">
                                        <label for="origin_price">原價</label>
                                        <input id="origin_price" v-model="metaProduct.origin_price" type="number" class="form-control" placeholder="請輸入原價" />
                                    </div>

                                    <div class="form-group col-sm-6">
                                        <label for="price">售價</label>
                                        <input id="price" v-model="metaProduct.price" type="number" class="form-control" placeholder="請輸入售價" />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-sm-6">
                                        <label for="description">產品描述</label>
                                        <input id="description" v-model="metaProduct.description" type="text" class="form-control" placeholder="請輸入產品描述" />
                                    </div>

                                    <div class="form-group col-sm-6">
                                        <label for="content">產品內容</label>
                                        <input id="content" v-model="metaProduct.content" type="text" class="form-control" placeholder="請輸入產品內容" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                取消
              </button>
                        <button type="button" v-if="!metaProduct.id" class="btn btn-primary" @click="addProduct(metaProduct)">新增</button>
                        <button type="button" v-if="metaProduct.id" class="btn btn-warning" @click="updateProduct(metaProduct)">修改</button>
                    </div>
                </div>
            </div>`,
    data() {
        return {
            // metaProduct: {},
        };
    },
    props: ['userData', 'metaProduct'],
    methods: {
        addProduct(item) {
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/admin/ec/product`;
            console.log(item);
            axios.post(apiURL, item).then(
                (res) => {
                    this.$emit("refresh");
                }, (error) => alert(error.message)
            );
        },
        updateProduct(item) {
            const apiURL = `${this.userData.apiPath}api/${this.userData.uuid}/admin/ec/product/${item.id}`;
            axios.patch(apiURL, item).then(
                (res) => {
                    this.$emit("refresh");
                }, (error) => alert(error.message)
            );
        },
    },
};