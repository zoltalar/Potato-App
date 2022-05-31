<template>
  <div class="page-aside-content">
    <b-container>
      <b-row>
        <b-col :md="colAside.md" :lg="colAside.lg">
          <aside>
            <slot name="aside"></slot>
          </aside>
        </b-col>
        <b-col :md="colMain.md" :lg="colMain.lg">
          <main>
            <article id="main-content">
              <slot></slot>
            </article>
          </main>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'PageAsideContent',
  props: {
    colAside: {
      type: Object,
      required: false,
      default: () => ({
        md: 4,
        lg: 3
      })
    },
    colMain: {
      type: Object,
      required: false,
      default: () => ({
        md: 8,
        lg: 9
      })
    }
  }
}
</script>
