<template>
  <div id="dictionary">
    <div class="title">
      <p class="description">Select language<br />言語を選択してください</p>
      <p class="sub">SELECT:WASD/HJKL/ARROW OK:Space/Enter</p>
    </div>
    <div class="dicts">
      <div
        v-for="(dict, i) in dicts"
        :key="i"
        class="dict"
        :class="selectingDictIndex === i ? 'selected' : ''"
      >
        {{ dict.lang }}
        <div class="border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DictJP from '~/assets/dict/dict_jp.json'
import DictEN from '~/assets/dict/dict_en.json'

export default {
  name: 'Dictionary',
  data: function() {
    return {
      dicts: [DictJP, DictEN],
      selectingDictIndex: 0
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onkey)
  },
  destroyed() {
    window.removeEventListener('keydown', this.onkey)
  },
  methods: {
    onkey(e) {
      e.preventDefault()
      if (e.key === ' ' || e.key === 'Enter') {
        window.removeEventListener('keydown', this.onkey)
        this.$emit('on-select', this.dicts[this.selectingDictIndex])
      } else if (
        e.key === 'w' ||
        e.key === 'k' ||
        e.key === 'a' ||
        e.key === 'h' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft'
      ) {
        this.selectingDictIndex -= 1
        if (this.selectingDictIndex < 0)
          this.selectingDictIndex = this.dicts.length - 1
      } else if (
        e.key === 's' ||
        e.key === 'j' ||
        e.key === 'd' ||
        e.key === 'l' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight'
      ) {
        this.selectingDictIndex += 1
        if (this.selectingDictIndex >= this.dicts.length)
          this.selectingDictIndex = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#dictionary {
}
.title {
  .description {
    font-size: 3rem;
  }
  .sub {
    font-size: 1.5rem;
    color: grey;
  }
}

@keyframes borderIn {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes colorIn {
  from {
    color: $black;
  }
  to {
    color: $typing-current-color;
  }
}

.dicts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  font-size: 5rem;
  .dict {
    padding: 0 100px;
    height: 120px;
    line-height: 120px;
  }
  .selected {
    color: $typing-current-color;
    animation-name: colorIn;
    animation-duration: 0.2s;
    animation-timing-function: ease-out;
  }
  .border {
    border-bottom: solid 5px;
    border-color: $bg-color;
  }
  .selected {
    .border {
      color: $typing-current-color;
      border-bottom: solid 5px;
      animation-name: borderIn;
      animation-duration: 0.2s;
      animation-timing-function: ease-out;
    }
  }
}
</style>
