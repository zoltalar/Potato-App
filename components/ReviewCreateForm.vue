<template>
  <form class="form-review-create">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.rating') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-rating variant="warning" size="lg" class="p-0" no-border inline v-model="review.rating" />
      <div class="invalid-feedback d-block" v-if="error('rating') !== null">
        {{ error('rating') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.title')">
      <b-form-input :class="{'is-invalid': error('title') !== null}" maxlength="255" v-model="review.title" />
      <div class="invalid-feedback d-block" v-if="error('title') !== null">
        {{ error('title') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.review') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-textarea id="input-review-content" :class="{'is-invalid': error('content') !== null}" rows="7" maxlength="1000" v-model="review.content"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('content') !== null">
        {{ error('content') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-review-content" ref="review-content" />
      </small>
    </b-form-group>
  </form>
</template>
<script>
import formErrors from '@/mixins/form-errors'
export default {
  name: 'ReviewCreateForm',
  mixins: [ formErrors ],
  props: {
    rateable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    review: {
      rating: null,
      title: '',
      content: ''
    }
  }),
  methods: {
    store () {
      let review = this.review
      this
        .$axios
        .post(this.uri(), review)
        .then((response) => {
          this.setErrors(response)
          review = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(review)) {
            this.$root.$emit('review-created', { review })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    uri () {
      const type = this.type
      const rateable = this.rateable
      return `/api/potato/reviews/store/${type}/${rateable.id}`
    }
  }
}
</script>
