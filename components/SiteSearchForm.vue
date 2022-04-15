<template>
  <form>
    <b-row>
      <b-col md="6" class="col-left">
        <b-form-input class="form-control-search" size="lg" :placeholder="$t('phrases.search')" />
      </b-col>
      <b-col md="6" class="col-right">
        <div class="position-relative">
          <b-button variant="primary" size="lg">
            <font-awesome-icon icon="search" />
          </b-button>
          <label for="input-search-location">{{ $t('phrases.near') }}</label>
          <b-form-input id="input-search-location" class="form-control-location" size="lg" />
        </div>
      </b-col>
    </b-row>
  </form>
</template>
