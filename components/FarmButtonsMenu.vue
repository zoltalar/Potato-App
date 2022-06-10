<template>
  <div>
    <ul class="list-buttons">
      <li class="mb-3">
        <b-button variant="primary" size="lg" block :disabled="farmIsOwner(farm)" @click.prevent="message">
          <font-awesome-icon icon="comment" />
          {{ $t('phrases.send_a_message') }}
        </b-button>
      </li>
      <li>
        <b-button variant="primary" size="lg" block :disabled="farmIsOwner(farm)">
          <font-awesome-icon icon="edit" />
          {{ $t('phrases.write_a_review') }}
        </b-button>
      </li>
    </ul>
    <b-modal id="modal-message-create" :title="$t('phrases.send_a_message')" @ok="send" no-enforce-focus>
      <message-create-form :messageable="farm" type="farm" ref="forms-message-create" />
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'FarmButtonsMenu',
  props: {
    farm: {
      type: Object,
      required: true
    }
  },
  methods: {
    listen () {
      this.$root.$on('message-created', (message) => {
        this.$bvModal.hide('modal-message-create')
      })
    },
    message () {
      this.$bvModal.show('modal-message-create')
    },
    send (event) {
      event.preventDefault()
      this.$refs['forms-message-create'].store()

      return
    }
  },
  mounted() {
    this.listen()
  }
}
</script>
