<template>
  <b-media>
    <template #aside>
      <font-awesome-icon icon="comment-alt" />
    </template>
    <div class="mb-2" v-html="comment.content"></div>
  </b-media>
</template>
<script>
export default {
  name: 'CommentListItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>
