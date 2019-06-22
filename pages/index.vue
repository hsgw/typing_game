<template>
  <div class="container">
    <Game
      :dict="dicts[selectedDictIndex]"
      :game-duration="gameDuration"
      @on-end="gameEnd"
    />
  </div>
</template>

<script>
import Game from '~/components/Game.vue'
import DictJP from '~/assets/dict/dict_jp.json'
import DictEN from '~/assets/dict/dict_en.json'

export default {
  components: {
    Game
  },
  data: function() {
    return {
      dicts: [DictJP, DictEN],
      selectedDictIndex: 0,
      gameDuration: 15
    }
  },
  created() {},
  methods: {
    gameEnd(result) {
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $bg-color;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
