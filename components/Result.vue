<template>
  <div>
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
      <div class="description animation">Press any key to continue</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: { result: Object },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      window.addEventListener('keydown', this.onkey)
    }, 1500)
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
.inner {
  display: flex;
  padding-top: 1rem;
  text-align: left;
}
.title {
  display: inline-block;
  color: white;
  background-color: $black;
  font-size: 6rem;
  padding-left: 1rem;
  width: 600px;
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
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.description {
  opacity: 0;
  margin-top: 2rem;
  font-size: 2rem;
  &.animation {
    opacity: 0;
    animation: blink 1s step-end infinite;
    animation-delay: 1.5s;
  }
}
</style>
