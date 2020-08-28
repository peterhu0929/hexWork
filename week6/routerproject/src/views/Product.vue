<template>
  <div>
    <h3>單一產品細節</h3>
    <button @click="goBack()">Back</button>

    <h2>{{selectProduct.title}}</h2>
    <h2>{{selectProduct.description}}</h2>
    <h2>{{selectProduct.content}}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectProduct: {}
    };
  },
  created() {
    this.getProductDetail(this.$route.params.id);
  },
  methods: {
    getProductDetail(id) {
      const apiURL = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(apiURL).then(res => (this.selectProduct = res.data.data));
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>