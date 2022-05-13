<template>
  <div class="page-aside-content">
    <b-container>
      <b-row>
        <b-col md="4" lg="3">
          <aside>
            <slot name="aside"></slot>
          </aside>
        </b-col>
        <b-col md="8" lg="9">
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
  name: 'PageAsideContent'
}
</script>
