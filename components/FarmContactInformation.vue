<template>
  <b-card class="card-default" v-if="farm">
    <nuxt-link :to="farmEditContactInformationLink(farm)" class="link-edit" :title="$t('phrases.edit_contact_information')" v-if="farmIsOwner(farm)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.contact_information') }}</b-card-title>
    <b-card-text class="mb-4">
      <span v-if="farmIsNameable(farm)">{{ fullName(farm, true) }}</span>
      <span v-else> - </span>
      <span v-if="farmPublishPhone(farm)">
        <br />
        {{ farm.phone }}
      </span>
      <span v-if="farm.website">
        <br />
        <b-link :href="farm.website" target="_blank">{{ farm.website }}</b-link>
      </span>
    </b-card-text>
    <nuxt-link :to="farmEditAddressLink(farm)" class="link-edit" :title="$t('phrases.edit_address')" v-if="farmIsOwner(farm)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.address') }}</b-card-title>
    <b-card-text class="mb-4">
      <span v-if="farmPublishAddress(farm) && addressLine(address)">{{ addressLine(address, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}</span>
      <span v-else> - </span>
    </b-card-text>
    <nuxt-link :to="farmEditMailingAddressLink(farm)" class="link-edit" :title="$t('phrases.edit_mailing_address')" v-if="farmIsOwner(farm)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.mailing_address') }}</b-card-title>
    <b-card-text>
      <span v-if="farmPublishMailingAddress(farm) && addressLine(mailingAddress)">{{ addressLine(mailingAddress, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}</span>
      <span v-else> - </span>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'FarmContactInformation',
  props: {
    farm: {
      type: Object,
      required: true
    }
  },
  computed: {
    address () {
      const farm = this.farm
      return this.addressableAddress(farm)
    },
    mailingAddress () {
      const farm = this.farm
      return this.addressableMailingAddress(farm)
    }
  },
}
</script>
