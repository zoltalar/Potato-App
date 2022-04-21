<template>
  <div class="page-content">
    <b-container>
      <main>
        <article id="main-content">
          <slot></slot>
        </article>
      </main>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'PageContent'
}
</script>
