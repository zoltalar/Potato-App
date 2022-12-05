<template>
  <div class="events search">
    <page-title>
      {{ $t('phrases.events') }}
    </page-title>
    <page-aside-content>
      <template v-slot:aside>
        <advanced-event-search-form />
      </template>
      <template>
        <div class="list-events" v-if="events.length > 0">
          <h2 class="p" v-html="$t('messages.events_search', { location: locationName })"></h2>
          <event-list-item-card
            :event="event"
            :status="false"
            class="mb-4"
            v-for="(event, i) in events"
            :key="'event-list-item-' + i">
            <template v-slot:links>
              <nuxt-link :to="localePath({ name: 'events-show-title-id', params: { title: slugify(event.title), id: event.id } })" class="card-link">{{ $t('phrases.details') }}</nuxt-link>
            </template>
          </event-list-item-card>
          <pagination class="mb-0" route="events-search-keyword-location-city-scope-page-radius" :meta="meta" />
        </div>
        <div v-else>
          <span v-html="$t('messages.events_search_empty')"></span>
          <nuxt-link :to="localePath({ name: 'events-create' })" class="btn btn-primary">{{ $t('phrases.add_event') }}</nuxt-link>
        </div>
      </template>
    </page-aside-content>
  </div>
</template>
<script>
export default {
  name: 'PageEventsSearch',
  head () {
    return {
      title: this.$t('messages.page_title_events_search', { location: this.locationName }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_events_search', { location: this.locationName })
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/events/search/:keyword/:location/:city/:scope/:page/:radius',
      pl: '/wydarzenia/szukaj/:keyword/:location/:city/:scope/:page/:radius'
    }
  },
  async asyncData({ params, store }) {
    const keyword = params.keyword
    const location = params.location
    const cityId = params.city
    const scope = params.scope
    const page = params.page
    const radius = params.radius
    try {
      const city = await store.dispatch('search/city', { cityId, location })
      const response = await store.dispatch('search/searchEvents', { keyword, location, cityId, scope, page, radius })
      return {
        events: response.search,
        meta: response.meta,
        city
      }
    } catch (error) {}
  },
  async fetch() {
    await this.loadResources()
  },
  data: () => ({
    events: [],
    meta: {},
    city: {}
  }),
  computed: {
    location () {
      return this.$route.params.location
    },
    locationName () {
      const city = this.city
      if (!this.$_.isNil(city)) {
        return city.name
      }
      return this.unslugify(this.location)
    },
    radius () {
      return this.$route.params.radius || this.eventMaxRadius()
    }
  }
}
</script>
