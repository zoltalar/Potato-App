<template>
  <form class="form-comment-create">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.comment') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-textarea id="input-comment-content" :class="{'is-invalid': error('content') !== null}" rows="7" maxlength="1000" v-model="comment.content"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('content') !== null">
        {{ error('content') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-comment-content" ref="comment-content" />
      </small>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'CommentCreateForm',
  mixins: [ formErrorsMixin ],
  props: {
    commentable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    comment: {
      content: ''
    }
  }),
  methods: {
    store () {
      let comment = this.comment
      const commentable = this.commentable
      const type = this.type
      this
        .$axios
        .post(`/api/potato/comments/store/${type}/${commentable.id}`, comment)
        .then((response) => {
          this.setErrors(response)
          comment = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(comment)) {
            this.$root.$emit('comment-created', { comment })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
