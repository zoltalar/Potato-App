<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <b-form-textarea id="input-farm-description" size="lg" rows="10" maxlength="5000" no-resize v-model="farm.description"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-farm-description" ref="farm-description" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath({ name: 'account-farms' })" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'FarmDescriptionForm',
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
      description: ''
    }
  }),
  watch: {
    editedFarm: {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
    },
    'farm.description': {
      handler (description) {
        this.$refs['farm-description'].update(description)
      }
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
        .put(`/api/potato/farms/update-description/${farm.id}`, farm)
        .then((response) => {
          this.setErrors(response)
          farm = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(farm)) {
            this.$root.$emit('farm-description-updated', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
