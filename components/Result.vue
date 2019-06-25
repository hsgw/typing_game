<template>
  <div id="result">
    <div class="inner">
      <div class="title">Result</div>
    </div>
    <div class="inner">
      <div class="heading">Score</div>
      <div class="value">
        {{ result.score }}
      </div>
    </div>
    <div class="inner">
      <div class="heading">Speed</div>
      <div class="value">{{ result.speed }} kpm</div>
    </div>
    <div class="inner">
      <div class="heading">Accuracy</div>
      <div class="value">{{ result.accuracy }} %</div>
    </div>
    <div v-show="ready" class="description">Press any key to continue</div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: { result: Object },
  data: function() {
    return {
      ready: false
    }
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.ready = true
      window.addEventListener('keydown', this.onkey)
    }, 3000)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkey)
  },
  methods: {
    onkey(e) {
      window.removeEventListener('keydown', this.onkey)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
#result {
  display: flex;
  flex-direction: column;
}
.title {
  display: inline-block;
  color: white;
  background-color: $black;
  font-size: 6rem;
  padding-left: 1rem;
  width: 600px;
}
.inner {
  display: flex;
  padding-top: 1rem;
  text-align: left;
}
.heading {
  display: inline-block;
  background-color: $black;
  color: white;
  font-size: 3rem;
  padding: 0 1rem;
  width: 250px;
}
.value {
  padding-left: 2rem;
  font-size: 3rem;
}

@keyframes blink {
  to,
  from {
    color: transparent;
  }
  50% {
    color: $black;
  }
}
.description {
  margin-top: 2rem;
  font-size: 2rem;
  animation: blink 1s step-end infinite;
  animation-delay: 1s;
}
</style>
