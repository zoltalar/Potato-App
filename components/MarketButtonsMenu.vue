<template>
  <div>
    <ul class="list-buttons">
      <li class="mb-3" v-if="!marketIsFavorited(market)">
        <b-button variant="primary" size="lg" block :disabled="marketIsOwner(market) || !$auth.loggedIn" @click.prevent="favorite">
          <font-awesome-icon icon="star" />
          {{ $t('phrases.add_to_favorites') }}
        </b-button>
      </li>
      <li class="mb-3">
        <b-button variant="primary" size="lg" block :disabled="marketIsOwner(market) || !$auth.loggedIn" @click.prevent="message">
          <font-awesome-icon icon="comment" />
          {{ $t('phrases.send_a_message') }}
        </b-button>
      </li>
      <li v-if="!marketIsReviewed(market)">
        <b-button variant="primary" size="lg" block :disabled="marketIsOwner(market) || !$auth.loggedIn" @click.prevent="review">
          <font-awesome-icon icon="edit" />
          {{ $t('phrases.write_a_review') }}
        </b-button>
      </li>
    </ul>
    <b-modal id="modal-message-create" :title="$t('phrases.send_a_message')" @ok="send" no-enforce-focus>
      <message-create-form :messageable="market" type="market" ref="form-message-create" />
    </b-modal>
    <b-modal id="modal-review-create" :title="$t('phrases.create_a_review')" @ok="rate" no-enforce-focus>
      <review-create-form :rateable="market" type="market" ref="form-review-create" />
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'MarketButtonsMenu',
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  methods: {
    favorite () {
      const market = this.market
      this
        .$axios
        .post(`/api/potato/favorites/store/market/${market.id}`)
        .then((response) => {
          const favorite = this.$_.get(response, 'data.data')
          if (!this.$_.isEmpty(favorite)) {
            this.$root.$emit('market-favorited', { favorite })
          }
        })
    },
    listen () {
      this.$root.$on('message-created', () => {
        this.$bvModal.hide('modal-message-create')
      })
      this.$root.$on('review-created', () => {
        this.$bvModal.hide('modal-review-create')
      })
    },
    message () {
      this.$bvModal.show('modal-message-create')
    },
    rate (event) {
      event.preventDefault()
      this.$refs['form-review-create'].store()

      return
    },
    review () {
      this.$bvModal.show('modal-review-create')
    },
    send (event) {
      event.preventDefault()
      this.$refs['form-message-create'].store()

      return
    }
  },
  mounted () {
    this.listen()
  }
}
</script>
