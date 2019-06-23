<template>
  <div class="title">
    <textarea v-model="text" rows="10" cols="50" :placeholder="typed">
    </textarea>
    <div class="description" :class="text ? 'show' : 'hidden'">
      Try typing, Press ESC key to start typing game.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  data: function() {
    return {
      source: 'Try typing.\nPress ESC key to start game...',
      typed: '',
      typedPos: 0,
      animationTimer: null,
      animationDirection: true,
      text: ''
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.animationTimer = this.typingAnimation()
    window.addEventListener('keydown', this.onkey)
  },
  beforeDestroy() {
    clearTimeout(this.animationTimer)
  },
  methods: {
    onkey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        window.removeEventListener('keydown', this.onkey)
        clearTimeout(this.animationTimer)
        this.$emit('press-start')
      }
    },
    typingAnimation() {
      let delayTime = 100 + Math.floor(Math.random() * 300)
      if (this.animationDirection) {
        if (this.typedPos <= this.source.length) {
          this.typedPos += 1
        } else {
          this.animationDirection = false
          delayTime += 5000
        }
      } else {
        delayTime = 50 + Math.floor(Math.random() * 100)
        if (this.typedPos > 0) {
          this.typedPos -= 1
        } else {
          this.animationDirection = true
          delayTime += 1000
        }
      }
      this.typed = this.source.slice(0, this.typedPos)
      setTimeout(this.typingAnimation, delayTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3rem;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  div {
    text-align: left;
  }
}

textarea {
  font-family: inherit;
  font-size: 100%;
  color: $black;
  padding: 1rem;
}

@keyframes show {
  from {
    color: transparent;
  }
  to {
    color: $typing-yet-color;
  }
}

@keyframes hidden {
  to {
    color: transparent;
  }
  from {
    color: $typing-yet-color;
  }
}

.description {
  font-size: 2rem;
  color: $typing-yet-color;
}
.hidden {
  animation: hidden 1s;
  animation-fill-mode: forwards;
}
.show {
  animation: show 1s;
  animation-fill-mode: forwards;
}
</style>
