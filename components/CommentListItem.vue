<template>
  <b-media>
    <template #aside>
      <font-awesome-icon icon="comment-alt" class="mt-1" />
    </template>
    <div class="mb-2">
      <span v-html="comment.content"></span>
    </div>
    <div class="small text-muted">
      {{
        $t('messages.model_footer', {
          date: shortDate(comment.created_at, localeDateFormat()),
          time: shortTime(comment.created_at),
          user: fullName(comment.user, true)
        })
      }}
    </div>
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
