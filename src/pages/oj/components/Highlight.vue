<template>
  <pre v-highlight="code"><code :class="language" style="border-left: 2px solid #00bc9b;"></code></pre>
</template>

<script>
  export default {
    props: {
      language: {
        type: String
      },
      code: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  pre {
    padding: 0;
    display: block;
    code {
      padding: 20px;
      font-size: 1.1em;
    }
  }
</style>
