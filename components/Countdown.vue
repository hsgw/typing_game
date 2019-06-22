<template>
  <div v-if="!countDownStarted" class="preStart">
    <div>Push space to start</div>
    <div>スペースを押してスタート</div>
  </div>
  <div v-else class="countDown">
    <div :class="countDownAnime ? 'animation' : ''">
      {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Countdown',
  data: function() {
    return {
      countDownStarted: false,
      countDownAnime: false,
      count: 3
    }
  },
  computed: {
    countDownChar() {
      return 3 - this.count
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onkey)
  },
  methods: {
    onkey(e) {
      e.preventDefault()
      if (!this.countDownStarted && e.key === ' ') {
        this.countDownStarted = true
        this.countDown()
      }
    },
    countDown() {
      if (this.count === 0) {
        // game start
        window.removeEventListener('keydown', this.onkey)
        this.$emit('on-end')
      } else {
        // hack for restart animation
        this.countDownAnime = true
        setTimeout(() => {
          this.countDownAnime = false
        }, 500)
        setTimeout(() => {
          this.count -= 1
          this.countDown()
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.preStart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    background: $black;
    padding: 0 100px;
    color: white;
    height: 150px;
    line-height: 150px;
  }
  :first-child {
    font-size: 5rem;
  }
  :last-child {
    margin-top: 100px;
    font-size: 4rem;
  }
}

@keyframes bounce {
  0% {
    transform: scale(1.1);
  }

  30% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

.countDown {
  font-size: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .animation {
    animation: bounce 0.2s ease-in;
  }
}
</style>
