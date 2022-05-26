<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group :label="$t('phrases.title')">
      <b-form-input :class="{'is-invalid': error('title') !== null}" maxlength="255" v-model="image.title" />
      <div class="invalid-feedback d-block" v-if="error('title') !== null">
        {{ error('title') }}
      </div>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'ImageEditForm',
  mixins: [ formErrorsMixin ],
  props: {
    editedImage: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    imageable: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    image: {
      id: null,
      title: ''
    }
  }),
  methods: {
    populate () {
      const editedImage = this.editedImage
      const image = this.image
      if (!this.$_.isEmpty(editedImage)) {
        this.$_.forOwn(editedImage, (value, key) => {
          if (key in image) {
            image[key] = value
          }
        })
        this.image = image
      }
    },
    update () {
      let image = this.image
      const type = this.type
      this
        .$axios
        .put(this.uri(), image)
        .then((response) => {
          this.setErrors(response)
          image = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(image)) {
            this.$root.$emit(type + '-image-updated', { image })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    uri () {
      const image = this.image
      const type = this.type
      const imageable = this.imageable
      return `/api/potato/images/update/${image.id}/${type}/${imageable.id}`
    }
  },
  mounted() {
    this.populate()
  }
}
</script>
