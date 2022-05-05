<template>
  <div class="page-content-aside">
    <b-container>
      <b-row>
        <b-col md="6">
          <main>
            <article id="main-content">
              <slot></slot>
            </article>
          </main>
        </b-col>
        <b-col md="6">
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
  name: 'PageContent'
}
</script>
