<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <b-form-textarea id="input-farm-operating-hours" size="lg" rows="7" maxlength="500" no-resize v-model="farm.operating_hours"></b-form-textarea>
      <small class="form-text text-muted">
        <chars-remaining for="input-farm-operating-hours" ref="farm-operating-hours" />
        <span>{{ $t('phrases.html_not_allowed') }}.</span>
      </small>
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
  name: 'FarmOperatingHoursForm',
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
      operating_hours: ''
    }
  }),
  watch: {
    'editedFarm': {
      handler() {
        this.populate()
      },
      deep: true
    },
    'farm.operating_hours': {
      handler(hours) {
        this.$refs['farm-operating-hours'].update(hours)
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
        .put(`/api/potato/farms/update-operating-hours/${farm.id}`, farm)
        .then((response) => {
          this.setErrors(response)
          farm = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(farm)) {
            this.$root.$emit('farm-operating-hours-updated', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
