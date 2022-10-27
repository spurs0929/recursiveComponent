<template>
    <ul>
      <li
        v-for="item of props.data"
        :key="item.id"
      >
        <p>{{ item.username }}</p>
        <p>{{ item.comment }}</p>
        <a href="javascript:;" @click="showReplyForm(item)">回覆</a>
        <div v-if="item.isReply">
          <p>
            <textarea v-model="item.replyText"></textarea>
          </p>
          <p>
            <button @click="addReply(item)">確認回覆</button>
          </p>
        </div>
        <div v-if="item.children">
          <ul>
            <recursive-comp :data="item.children" :user-info="props.userInfo"  @add-reply="addReply"></recursive-comp>
          </ul>
        </div>
      </li>
    </ul>
</template>

<script setup>
  const props = defineProps({
    data: Array,
    userInfo: Object
  });

  const emits = defineEmits(['addReply']);

  const showReplyForm = (item) => {
    item.isReply = !item.isReply;
  } 

  const addReply = (item) => {
    const replyText = item.replyText;
    emits('addReply', item, replyText, props.userInfo);
    item.isReply = false;
  } 
</script>

<style lang="scss" scoped>

</style>