<template>
  <div class="products">
    <page-title>
      {{ $t('phrases.products') }}
    </page-title>
    <page-content>
      <b-card header="Owoce" class="mb-4">
        <ul>
          <li>
            <a href="#">Agrest</a>
          </li>
          <li>
            <a href="#">Banany</a>
          </li>
          <li>
            <a href="#">Cytryny</a>
          </li>
          <li>
            <a href="#">Borówka Amerykańska</a>
          </li>
          <li>
            <a href="#">Brzoskwinie</a>
          </li>
          <li>
            <a href="#">Czereśnie</a>
          </li>
          <li>
            <a href="#">Agrest</a>
          </li>
          <li>
            <a href="#">Banany</a>
          </li>
          <li>
            <a href="#">Cytryny</a>
          </li>
          <li>
            <a href="#">Borówka Amerykańska</a>
          </li>
          <li>
            <a href="#">Brzoskwinie</a>
          </li>
          <li>
            <a href="#">Czereśnie</a>
          </li>
        </ul>
      </b-card>
      <b-card header="Warzywa" class="mb-4">
        <ul>
          <li>
            <a href="#">Bakłażan</a>
          </li>
          <li>
            <a href="#">Białe Ziemniaki</a>
          </li>
          <li>
            <a href="#">Brokuły</a>
          </li>
          <li>
            <a href="#">Brukiew</a>
          </li>
          <li>
            <a href="#">Brukselka</a>
          </li>
          <li>
            <a href="#">Buraki</a>
          </li>
          <li>
            <a href="#">Bób</a>
          </li>
          <li>
            <a href="#">Cebula</a>
          </li>
          <li>
            <a href="#">Chrzan</a>
          </li>
          <li>
            <a href="#">Ciecierzyca</a>
          </li>
          <li>
            <a href="#">Cukinia</a>
          </li>
          <li>
            <a href="#">Czerwona Cebula</a>
          </li>
          <li>
            <a href="#">Bakłażan</a>
          </li>
          <li>
            <a href="#">Białe Ziemniaki</a>
          </li>
          <li>
            <a href="#">Brokuły</a>
          </li>
          <li>
            <a href="#">Brukiew</a>
          </li>
          <li>
            <a href="#">Brukselka</a>
          </li>
          <li>
            <a href="#">Buraki</a>
          </li>
          <li>
            <a href="#">Bób</a>
          </li>
          <li>
            <a href="#">Cebula</a>
          </li>
          <li>
            <a href="#">Chrzan</a>
          </li>
          <li>
            <a href="#">Ciecierzyca</a>
          </li>
          <li>
            <a href="#">Cukinia</a>
          </li>
          <li>
            <a href="#">Czerwona Cebula</a>
          </li>
        </ul>
      </b-card>
      <b-card header="Nabial i Jaja" class="mb-4">
        <ul>
          <li>
            <a href="#">Jaja</a>
          </li>
          <li>
            <a href="#">Jogurt</a>
          </li>
          <li>
            <a href="#">Maslo</a>
          </li>
          <li>
            <a href="#">Mleko</a>
          </li>
          <li>
            <a href="#">Ser</a>
          </li>
        </ul>
      </b-card>
      <b-card header="Orzechy i Nasiona" class="mb-4">
        <ul>
          <li>
            <a href="#">Kasztany</a>
          </li>
          <li>
            <a href="#">Len</a>
          </li>
          <li>
            <a href="#">Orzechy Laskowe</a>
          </li>
          <li>
            <a href="#">Orzechy Włoskie</a>
          </li>
          <li>
            <a href="#">Orzeszki Ziemne</a>
          </li>
          <li>
            <a href="#">Ziarna Słonecznika</a>
          </li>
        </ul>
      </b-card>
      <b-card header="Miód" class="mb-4">
        <ul>
          <li>
            <a href="#">Miód Akacjowy</a>
          </li>
          <li>
            <a href="#">Miód Gryczany</a>
          </li>
          <li>
            <a href="#">Miód Lipowy</a>
          </li>
          <li>
            <a href="#">Miód Rzepakowy</a>
          </li>
          <li>
            <a href="#">Miód Spadziowy</a>
          </li>
          <li>
            <a href="#">Miód Wielokwiatowy</a>
          </li>
        </ul>
      </b-card>
    </page-content>
  </div>
</template>
<script>
export default {
  name: 'PageProductsIndex',
  layout: 'default',
  head () {
    return {
      title: this.$t('phrases.products'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('messages.meta_description_products')
        }
      ],
    }
  },
  nuxtI18n: {
    locales: ['en', 'pl'],
    paths: {
      en: '/products',
      pl: '/produkty'
    }
  }
}
</script>
<style lang="scss">
  .card {
    ul {
      list-style: square outside;
      margin: 0;
      overflow: auto;
      padding: 0 1rem 0 2rem;
      li {
        float: left;
        width: 25%;
        margin-right: 0;
      }
    }
  }
</style>
