<template>
  <b-card class="card-default" v-if="market">
    <nuxt-link :to="marketEditContactInformationLink(market)" class="link-edit" :title="$t('phrases.edit_contact_information')" v-if="marketIsOwner(market)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.contact_information') }}</b-card-title>
    <b-card-text class="mb-4">
      <span v-if="marketIsNameable(market)">{{ fullName(market, true) }}</span>
      <span v-else> - </span>
      <span v-if="marketPublishPhone(market)">
        <br />
        {{ market.phone }}
      </span>
      <span v-if="market.website">
        <br />
        <b-link :href="market.website" target="_blank">{{ market.website }}</b-link>
      </span>
    </b-card-text>
    <nuxt-link :to="marketEditAddressLink(market)" class="link-edit" :title="$t('phrases.edit_address')" v-if="marketIsOwner(market)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.address') }}</b-card-title>
    <b-card-text class="mb-4">
      <span v-if="marketPublishAddress(market) && addressLine(address)">
        {{ addressLine(address, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}<span v-if="address.stand">, {{ $t('phrases.stand') }}: {{ address.stand }}</span>
      </span>
      <span v-else> - </span>
    </b-card-text>
    <nuxt-link :to="marketEditMailingAddressLink(market)" class="link-edit" :title="$t('phrases.edit_mailing_address')" v-if="marketIsOwner(market)">
      <font-awesome-icon icon="pencil-alt" />
    </nuxt-link>
    <b-card-title class="h6 mb-1">{{ $t('phrases.mailing_address') }}</b-card-title>
    <b-card-text>
      <span v-if="marketPublishMailingAddress(market) && addressLine(mailingAddress)">{{ addressLine(mailingAddress, ',', ['address', 'address_2', 'city', 'state', 'zip']) }}</span>
      <span v-else> - </span>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  name: 'MarketContactInformation',
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  computed: {
    address () {
      const market = this.market
      return this.addressableAddress(market)
    },
    mailingAddress () {
      const market = this.market
      return this.addressableMailingAddress(market)
    }
  },
}
</script>
