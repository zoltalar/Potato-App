<template>
  <div class="page-content-aside">
    <b-container>
      <b-row>
        <b-col :md="colMain.md">
          <main>
            <article id="main-content">
              <slot></slot>
            </article>
          </main>
        </b-col>
        <b-col :md="colAside.md">
          <aside>
            <slot name="aside"></slot>
          </aside>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'PageContentAside',
  props: {
    colAside: {
      type: Object,
      required: false,
      default: () => ({
        md: 6
      })
    },
    colMain: {
      type: Object,
      required: false,
      default: () => ({
        md: 6
      })
    }
  }
}
</script>
