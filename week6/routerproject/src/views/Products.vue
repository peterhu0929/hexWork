<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <h2>這是產品列表頁面</h2>
   <table>
  <tr>
    <th>Title</th>
    <th>Description</th>
    <th>Price</th>
    <th>Detail</th>
  </tr>
  <tr v-for="item in products" :key="item.id">
    <td>{{item.title}}</td>
    <td>{{item.content}}</td>
    <td>{{item.price}}</td>
    <td>
      <router-link :to="`/product/${item.id}`">Detail</router-link>
    </td>
    <td>
      <button @click="goPage(item.id)">Detail</button>
      </td>
  </tr>
  
</table>
    </div>
</template>
<script>
export default {
    data(){
      return {
        products:[],
        isLoading:false   
      }
    },
    created() {
        this.getProducts();
    },
    methods: {
        getProducts(num=1){
        this.isLoading=true;
        const apiURL = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${num}`;
            console.log(apiURL);
            this.$http.get(apiURL).then((res)=>{
                this.products=res.data.data;
                this.isLoading=false;
                console.log(this.products);
            })
        },
        goPage(id){
          this.$router.push(`/product/${id}`);
        }
    },
}
</script>