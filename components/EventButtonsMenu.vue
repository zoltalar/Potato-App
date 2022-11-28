<template>
  <div>
    <ul class="list-buttons">
      <li class="mb-3">
        <b-button variant="primary" size="lg" block :disabled="eventIsOwner(event) || !$auth.loggedIn" @click.prevent="message">
          <font-awesome-icon icon="comment" />
          {{ $t('phrases.send_a_message') }}
        </b-button>
      </li>
    </ul>
    <b-modal id="modal-message-create" :title="$t('phrases.send_a_message')" @ok="send" no-enforce-focus>
      <message-create-form :messageable="event" type="event" ref="form-message-create" />
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'EventButtonsMenu',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    listen () {
      this.$root.$on('message-created', () => {
        this.$bvModal.hide('modal-message-create')
      })
    },
    message () {
      this.$bvModal.show('modal-message-create')
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
