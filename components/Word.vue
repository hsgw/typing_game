<template>
  <div>
    <h1>{{ word }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Word',
  props: { word: String, typedCount: Number }
}
</script>
