<template>
  <div id="game">
    <Dictionary v-if="dict === null" @on-select="selectDict" />
    <Countdown v-else-if="!started" @on-end="gameStart" />
    <template v-else>
      <div id="word">{{ word.raw }}</div>
      <TypingWordStatus
        :time-stamp="timeStamp"
        :word="currentTypingWord"
        :typed="typed.charCount"
        :typo="typo"
        :current-key="currentKey"
      />
      <div
        id="progressBar"
        :style="'animation-duration: ' + gameDuration + 's'"
      ></div>
    </template>
  </div>
</template>

<script>
import Dictionary from '~/components/Dictionary.vue'
import Countdown from '~/components/Countdown.vue'
import TypingWordStatus from '~/components/TypingWordStatus.vue'
import Roman from '~/components/Roman.js'

export default {
  name: 'Game',
  components: {
    Dictionary,
    Countdown,
    TypingWordStatus
  },
  props: { gameDuration: Number },
  data: function() {
    return {
      timeStamp: Date.now(),
      started: false,
      dict: null,
      word: {
        raw: '',
        alpha: [],
        history: []
      },
      typed: {
        total: 0,
        charCount: 0,
        alphaCount: 0,
        char: '',
        typo: 0
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
    currentTypingWord() {
      let ret = ''
      for (const a of this.word.alpha) {
        ret += a[0][0]
      }
      return ret
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.onkey)
  },
  methods: {
    onkey(e) {
      e.preventDefault()
      if (e.key === 'Shift' || e.key === 'Control') {
        return
      }

      if (e.key === ' ') this.currentKey = 'Space'
      else this.currentKey = e.key

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
        this.typed.typo += 1
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
    selectDict(dict) {
      this.dict = dict
    },
    gameStart() {
      this.nextWord()
      window.addEventListener('keydown', this.onkey)
      // game start
      this.started = true
      setTimeout(() => {
        // game end
        // this.started = false
        window.removeEventListener('keydown', this.onkey)
        this.$emit('on-end', {
          score: this.score.total,
          speed:
            Math.round((this.result.stroke / this.result.duration) * 60 * 100) /
            100,
          accuracy:
            Math.round((this.result.typo / this.result.stroke) * 100 * 100) /
            100
        })
      }, this.gameDuration * 1000)
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
</style>
