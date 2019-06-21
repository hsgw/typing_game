<template>
  <div id="wordStatus">
    <div v-for="(c, i) in word" :key="i" class="container" :class="getStyle(i)">
      <div class="border"></div>
      <div class="char" :class="typoAnime ? 'animation' : ''">
        {{ c[0][0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypingWordStatus',
  props: { timeStamp: Number, word: String, typed: Number, typo: Boolean },
  data: function() {
    return { typoAnime: false, animationTimeout: 0 }
  },
  watch: {
    timeStamp() {
      if (this.typo) {
        this.typoAnime = true
        if (this.animationTimeout) clearTimeout(this.animationTimeout)
        this.typoAnimationTimeout = setTimeout(() => {
          this.typoAnime = false
          this.typoAnimationTimeout = 0
        }, 300)
      }
    }
  },
  beforeDestroy() {
    if (this.animationTimeout) clearTimeout(this.animationTimeout)
  },
  methods: {
    getStyle(i) {
      if (i === this.typed) {
        if (this.typo) return 'typo'
        return 'current'
      } else if (i < this.typed) {
        return 'typed'
      } else {
        return 'yet'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/csshake-default.css';

#wordStatus {
  padding-top: 1rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
}

.container {
  width: 65px;
  height: 65px;
  position: relative;
}

.char {
  width: 65px;
  height: 65px;
  text-align: center;
  line-height: 45px;
  position: absolute;
  top: 0;
}

.border {
  @extend .char;
  border: 2px;
}

@keyframes borderIn {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.current {
  color: $typing-current-color;
  .border {
    border-bottom: solid;
    animation-name: borderIn;
    animation-duration: 0.15s;
  }
}

.typo {
  color: $typing-typo-color;
  .border {
    border-bottom: solid;
  }
  .animation {
    animation: shake;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
}

.yet {
  color: $typing-yet-color;
}

.typed {
  color: $typing-typed-color;
}
</style>
