<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.deactivation_reason') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-textarea id="input-farm-deactivation-reason" :class="{'is-invalid': error('deactivation_reason') !== null}" size="lg" rows="7" maxlength="500" no-resize v-model="farm.deactivation_reason"></b-form-textarea>
      <div class="invalid-feedback d-block" v-if="error('deactivation_reason') !== null">
        {{ error('deactivation_reason') }}
      </div>
      <small class="form-text text-muted">
        <chars-remaining for="input-farm-deactivation-reason" ref="farm-deactivation-reason" />
      </small>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.submit') }}</b-button>
      <nuxt-link :to="localePath('/account/farms')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'FarmDeactivateForm',
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
      deactivation_reason: ''
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
    'farm.deactivation_reason': {
      handler (reason) {
        this.$refs['farm-deactivation-reason'].update(reason)
      }
    }
  },
  methods: {
    populate () {
      const editedFarm = this.editedFarm
      const farm = this.farm
      if (!this.$_.isEmpty(editedFarm)) {
        this.$_.forOwn(editedFarm, (value, key) => {
          if (key in farm) {
            farm[key] = value
          }
        })
        this.farm = farm
      }
    },
    reset () {
      this.farm.deactivation_reason = ''
    },
    update () {
      let farm = this.farm
      this
        .$axios
        .put(`/api/potato/farms/deactivate/${farm.id}`, farm)
        .then((response) => {
          this.setErrors(response)
          farm = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(farm)) {
            this.reset()
            this.$root.$emit('farm-deactivated', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
