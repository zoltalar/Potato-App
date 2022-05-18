<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group :label="$t('phrases.facebook')">
      <b-input-group prepend="https://facebook.com/">
        <b-form-input :class="{'is-invalid': error('facebook') !== null}" maxlength="100" v-model="farm.facebook" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('facebook') !== null">
        {{ error('facebook') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.twitter')">
      <b-input-group prepend="https://twitter.com/">
        <b-form-input :class="{'is-invalid': error('twitter') !== null}" maxlength="100" v-model="farm.twitter" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('twitter') !== null">
        {{ error('twitter') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.pinterest')">
      <b-input-group prepend="https://pinterest.com/">
        <b-form-input :class="{'is-invalid': error('pinterest') !== null}" maxlength="100" v-model="farm.pinterest" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('pinterest') !== null">
        {{ error('pinterest') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.instagram')">
      <b-input-group prepend="https://instagram.com/">
        <b-form-input :class="{'is-invalid': error('instagram') !== null}" maxlength="100" v-model="farm.instagram" />
      </b-input-group>
      <div class="invalid-feedback d-block" v-if="error('instagram') !== null">
        {{ error('instagram') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath('/account/farms')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'FarmSocialMediaForm',
  mixins: [ formErrorsMixin ],
  props: {
    editedFarm: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    farm: {
      id: null,
      facebook: '',
      twitter: '',
      pinterest: '',
      instagram: ''
    }
  }),
  watch: {
    'editedFarm': {
      handler() {
        this.populate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    populate () {
      const editedFarm = this.editedFarm
      const farm = this.farm
      if ( ! this.$_.isEmpty(editedFarm)) {
        this.$_.forOwn(editedFarm, (value, key) => {
          if (key in farm) {
            farm[key] = value
          }
        })
        this.farm = farm
      }
    },
    update () {
      let farm = this.farm

      this
        .$axios
        .put(`/api/potato/farms/update-social-media/${farm.id}`, farm)
        .then((response) => {
          this.setErrors(response)
          farm = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(farm)) {
            this.$root.$emit('farm-social-media-updated', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
