<template>
  <form class="form-default" @submit.prevent="store">
    <b-form-group :label="$t('phrases.title')">
      <b-form-input :class="{'is-invalid': error('title') !== null}" maxlength="255" v-model="image.title" />
      <div class="invalid-feedback d-block" v-if="error('title') !== null">
        {{ error('title') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.photo') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-file accept="image/*" size="lg" :placeholder="$t('phrases.choose_an_image')" v-model="file" />
      <div class="invalid-feedback d-block" v-if="error('file') !== null">
        {{ error('file') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.add_photo') }}</b-button>
      <nuxt-link :to="cancelUrl()" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'ImageCreateForm',
  mixins: [ formErrorsMixin ],
  props: {
    imageable: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    image: {
      title: ''
    },
    file: undefined
  }),
  methods: {
    cancelUrl () {
      const type = this.type
      if (type === 'farm') {
        return this.localePath({ name: 'account-farms' })
      } else if (type === 'market') {
        return this.localePath({ name: 'account-markets' })
      }
      return ''
    },
    reset () {
      const image = this.image
      this.$_.forOwn(image, (value, key) => {
        this.image[key] = ''
      })
      this.file = undefined
    },
    store () {
      let data = new FormData()
      let image = this.image
      const type = this.type
      const file = this.file
      this.$_.forOwn(image, (value, key) => {
        if (!this.$_.isNil(value)) {
          data.append(key, value)
        }
      })
      data.append('file', file)
      this
        .$axios({
          method: 'post',
          url: this.uri(),
          data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.setErrors(response)
          image = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(image)) {
            this.reset()
            this.$root.$emit(type + '-image-created', { image })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    uri () {
      const imageable = this.imageable
      const type = this.type
      return `/api/potato/images/store/${type}/${imageable.id}`
    }
  }
}
</script>
