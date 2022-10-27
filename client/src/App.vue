<template>
  <div>
    <div>
      <h1>{{ userStore.userInfo.username }}</h1>
      <button 
        @click="userStore.setUserInfo({
          id: 1,
          username: 'test'    
        })"
        :class="{ 'active': userStore.userInfo.id === 1 }"
      >test</button>
       <button 
        @click="userStore.setUserInfo({
          id: 2,
          username: 'test1'    
        })"
        :class="{ 'active': userStore.userInfo.id === 2 }"
      >test1</button>
       <button 
        @click="userStore.setUserInfo({
          id: 3,
          username: 'test2'    
        })"
        :class="{ 'active': userStore.userInfo.id === 3 }"
      >test2</button>
    </div>
    <product-comment></product-comment>
  </div>
  
</template>

<script setup>
  import ProductComment from './components/ProductComment';
  import useUserStore from './store/user';

  const userStore = useUserStore();
</script>

<style lang="scss">
  .active {
    background-color: #000;
    color: #fff;
  }
</style>