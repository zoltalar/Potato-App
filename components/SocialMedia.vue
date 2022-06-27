<template>
  <ul class="list-inline list-social">
    <li class="list-inline-item list-social-item-facebook" v-if="url('facebook')">
      <a :href="url('facebook')" target="_blank" :title="$t('phrases.facebook')">
        <font-awesome-icon :icon="['fab', 'facebook-square']" />
      </a>
    </li>
    <li class="list-inline-item list-social-item-twitter" v-if="url('twitter')">
      <a :href="url('twitter')" target="_blank" :title="$t('phrases.twitter')">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
    </li>
    <li class="list-inline-item list-social-item-pinterest" v-if="url('pinterest')">
      <a :href="url('pinterest')" target="_blank" :title="$t('phrases.pinterest')">
        <font-awesome-icon :icon="['fab', 'pinterest-square']" />
      </a>
    </li>
    <li class="list-inline-item list-social-item-instagram" v-if="url('instagram')">
      <a :href="url('instagram')" target="_blank" :title="$t('phrases.instagram')">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
    </li>
    <li class="list-inline-item" v-if="type === 'farm' && farmIsOwner(linkable)">
      <nuxt-link :to="farmEditSocialMediaLink(linkable)" class="link-edit" :title="$t('phrases.edit_social_media')">
        <font-awesome-icon icon="pencil-alt" />
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SocialMedia',
  props: {
    linkable: {
      type: Object,
      required: false
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    url (site) {
      const linkable = this.linkable
      return this.$_.get(linkable, site + '_url')
    }
  }
}
</script>
