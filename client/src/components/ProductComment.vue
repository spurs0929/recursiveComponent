<template>
  <div>
    <div>
      <p>
        <textarea v-model="state.commentText"></textarea>
      </p>
      <p>
        <button @click="addComment(userStore.userInfo)">提交評論</button>
      </p>
    </div>
    <div>
      <ul>
        <recursive-comp :data="state.commentTree" :user-info="userStore.userInfo" @add-reply="addReply"></recursive-comp>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from 'vue';
  import useUserStore from '../store/user';
  import http from '../utils/http';
  import recursiveComp from './RecursiveComp';
  import Comment from './Comment';

  const userStore = useUserStore();

  const { state, addComment, addReply } = new Comment({
    getterUrl: 'http://localhost:3000/get_comment_list',
    setterUrl: 'http://localhost:3000/set_comment_list'
  });
</script>

<style>

</style>