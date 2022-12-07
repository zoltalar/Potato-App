<template>
  <div>
    <ul class="list-buttons">
      <li class="mb-3">
        <b-button variant="primary" size="lg" block :disabled="eventIsOwner(event) || !$auth.loggedIn" @click.prevent="message">
          <font-awesome-icon icon="comment" />
          {{ $t('phrases.send_a_message') }}
        </b-button>
      </li>
      <li class="mb-3">
        <b-button variant="primary" size="lg" block @click.prevent="calendar">
          <font-awesome-icon icon="calendar-alt" />
          {{ $t('phrases.download_calendar_file') }}
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
    calendar () {
      const event = this.event
      const timestamp = (new Date()).getTime()
      this
        .$axios
        .get(`/api/potato/events/calendar/${event.id}?timestamp=${timestamp}`, {
          responseType: 'arraybuffer'
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'text/calendar' })
          const link = document.createElement('a')
          const download = true

          link.href = window.URL.createObjectURL(blob)

          if (download) {
            link.download = this.slugify(event.title) + '.ics'
          } else {
            link.target = '_blank'
          }

          link.click()
        })
    },
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
