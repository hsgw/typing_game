<template>
  <div class="container">
    <Title v-if="status === Status.Title" @press-start="startGame" />
    <Game
      v-else-if="status === Status.Game"
      :game-duration="gameDuration"
      @on-end="gameEnd"
    />
  </div>
</template>

<script>
import Title from '~/components/Title.vue'
import Game from '~/components/Game.vue'

export default {
  components: {
    Title,
    Game
  },
  data: function() {
    return {
      Status: {
        Title: 0,
        Game: 1,
        Result: 2,
        Ranking: 3
      },
      status: 0,
      gameDuration: 15
    }
  },
  created() {
    this.status = this.Status.Title
  },
  destroyed() {},
  methods: {
    startGame() {
      this.status = this.Status.Game
    },
    gameEnd(result) {
      this.status = this.Status.Result
      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $bg-color;
  color: $black;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
