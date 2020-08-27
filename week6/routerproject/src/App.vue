<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/products">產品列表</router-link> |
      <router-link to="/about">關於我們</router-link> |
      <router-link to="/order">結帳</router-link> |
      <router-link to="/orderfinish">結帳完成</router-link> 
      <br>
      <router-link to="/admin">後台管理</router-link> |
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/coupons">優惠卷列表</router-link> |
      <router-link to="/admin/orders">訂單列表</router-link> |
      <router-link to="/admin/images">圖片儲存列表</router-link> |
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
