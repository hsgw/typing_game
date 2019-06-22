<template>
  <div class="container">
    <Title v-if="status === Status.Title" :dicts="dicts" />
    <Game
      v-if="status === Status.Game"
      :game-duration="gameDuration"
      @on-end="gameEnd"
    />
  </div>
</template>

<script>
import Game from '~/components/Game.vue'

const Status = {
  Title: 0,
  Game: 1,
  Result: 2,
  Ranking: 3
}

export default {
  components: {
    Game
  },
  data: function() {
    return {
      Status: Status,
      status: 1,
      gameDuration: 15
    }
  },
  created() {
    this.status = Status.Game
  },
  destroyed() {
    window.removeEventListener('keydown', this.onkey)
  },
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
  color: $black;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
