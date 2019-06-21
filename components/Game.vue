<template>
  <div id="game">
    <template v-if="started">
      <div id="word">{{ word.raw }}</div>
      <TypingWordStatus
        :time-stamp="timeStamp"
        :word="currentTypingWord()"
        :typed="typed.charCount"
        :typo="typo"
        :current-key="currentKey"
      />
      <div
        id="progressBar"
        :style="'animation-duration: ' + gameDuration + 's'"
      ></div>
    </template>
    <template v-else>
      <div v-if="countDown === -1" class="preStart">
        <div>Push space to start</div>
        <div>スペースを押してスタート</div>
      </div>
      <div v-else-if="countDownChar !== 0" class="countDown">
        <div :class="countDownAnime ? 'animation' : ''">
          {{ countDownChar }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TypingWordStatus from '~/components/TypingWordStatus.vue'
import Roman from '~/components/Roman.js'

export default {
  name: 'Game',
  components: {
    TypingWordStatus
  },
  props: { dict: Object, gameDuration: Number },
  data: function() {
    return {
      timeStamp: Date.now(),
      countDown: -1,
      countDownAnime: false,
      started: false,
      word: {
        raw: '',
        alpha: [],
        history: []
      },
      typed: {
        total: 0,
        charCount: 0,
        alphaCount: 0,
        char: ''
      },
      currentKey: null,
      score: {
        total: 0,
        base: 0
      },
      typo: false
    }
  },
  computed: {
    countDownChar() {
      return 3 - this.countDown
    }
  },
  created() {
    this.nextWord()
  },
  mounted() {
    window.addEventListener('keydown', this.onkey)
  },
  methods: {
    onkey(e) {
      e.preventDefault()
      if (!this.started) {
        if (e.key === ' ') {
          this.countDown = 0
          this.startCountDown()
        }
        return
      }
      if (e.key === 'Shift' || e.key === 'Control') {
        return
      }
      this.currentKey = e.key
      if (this.currentKey === ' ') this.currentKey = 'Space'
      this.timeStamp = Date.now()
      const current = this.word.alpha[this.typed.alphaCount][0].filter(c => {
        return c.search(this.typed.char + e.key) === 0
      })
      if (current.length !== 0) {
        this.typo = false
        this.word.alpha[this.typed.alphaCount][0] = current
        this.typed.char += e.key
        this.typed.total += 1
        this.typed.charCount += 1
        this.score.base += 1
        this.score.total += this.score.base
        if (
          this.typed.char.length ===
          this.word.alpha[this.typed.alphaCount][0][0].length
        ) {
          this.typed.char = ''
          this.typed.alphaCount += 1
          if (this.typed.alphaCount === this.word.alpha.length) {
            this.typed.alphaCount = 0
            this.typed.charCount = 0
            this.nextWord()
          }
        }
      } else {
        this.typo = true
        this.score.base = 0
      }
    },
    nextWord() {
      while (true) {
        const rand = Math.floor(Math.random() * this.dict.words.length)
        if (this.word.history.length >= this.dict.words.length) {
          this.word.history = []
        }
        if (!this.word.history.includes(rand)) {
          this.word.history.push(rand)
          this.word.raw = this.dict.words[rand]
          this.word.alpha = Roman.transcate(this.word.raw)
          return
        }
      }
    },
    currentTypingWord() {
      let ret = ''
      for (const a of this.word.alpha) {
        ret += a[0][0]
      }
      return ret
    },
    setGameTimer() {
      setTimeout(() => {
        this.started = false
        window.removeEventListener('keydown', this.onkey)
        this.$emit('game-end', {
          score: this.score.total,
          count: this.typed.total
        })
      }, this.gameDuration * 1000)
    },
    startCountDown() {
      if (this.countDown === 3) {
        this.started = true
        this.setGameTimer()
      } else {
        this.countDownAnime = true
        setTimeout(() => {
          this.countDownAnime = false
        }, 500)
        setTimeout(() => {
          this.countDown += 1
          this.startCountDown()
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#game {
  position: relative;
  width: 100vw;
}

#word {
  color: $word-color;
  font-size: 7rem;
}

@keyframes progress {
  from {
    width: 0vw;
  }
  to {
    width: 100vw;
  }
}

#progressBar {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 2px;
  background: $progress-color;
  animation-name: progress;
  animation-timing-function: linear;
}

.progressAnime {
  animation-name: progress;
  animation-timing-function: linear;
}

.preStart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    background: black;
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
