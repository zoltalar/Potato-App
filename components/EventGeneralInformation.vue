<template>
  <b-card class="card-default" v-if="event">
    <nuxt-link :to="eventEditGeneralInformationLink(event)" class="link-edit" :title="$t('phrases.edit_general_information')" v-if="eventIsOwner(event)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.general_information') }}</b-card-title>
    <b-card-text class="mb-4">
      <span v-if="isValidDate(event.start_date) || isValidDate(event.end_date)">
        {{ dateRange(event.start_date, event.end_date) }}
        <br />
      </span>
      <span v-if="isValidTime(event.start_time) && isValidTime(event.end_time)">
        {{ timeRange(event.start_time, event.end_time) }}
        <br />
      </span>
      <span v-if="event.phone">
        {{ event.phone }}
        <br />
      </span>
      <span v-if="event.website">
        <b-link :href="event.website" target="_blank">{{ event.website }}</b-link>
      </span>
    </b-card-text>
    <nuxt-link :to="eventEditAddressLink(event)" class="link-edit" :title="$t('phrases.edit_address')" v-if="eventIsOwner(event)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.address') }}</b-card-title>
    <b-card-text>
      <span v-if="addressLine(address)">{{ addressLine(address, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}</span>
      <span v-else> - </span>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'EventGeneralInformation',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    address () {
      const event = this.event
      return this.addressableAddress(event)
    }
  }
}
</script>
