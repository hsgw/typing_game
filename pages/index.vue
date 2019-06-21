<template>
  <div class="container">
    <Game :dict="dict" :game-duration="gameDuration" @game-end="gameEnd" />
  </div>
</template>

<script>
import Game from '~/components/Game.vue'
// eslint-disable-next-line no-unused-vars
import dictEn from '~/static/dict_en.json'
// eslint-disable-next-line no-unused-vars
import dictJp from '~/static/dict_jp.json'

export default {
  components: {
    Game
  },
  data: function() {
    return {
      dict: dictJp,
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
