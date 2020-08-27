<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <loading :active.sync="isLoading"></loading> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data(){
    return{
      isLoading:false
    };
  },
   mounted() {
      // this.isLoading=true;
      // setTimeout(()=>{
      // this.isLoading=false;
      // },3000)
    }
};
</script>
