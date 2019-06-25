<template>
  <div id="main">
    <Title v-if="status === Status.Title" @press-start="startGame" />
    <Game
      v-else-if="status === Status.Game"
      :game-duration="gameDuration"
      @on-end="gameEnd"
    />
    <Result
      v-else-if="status === Status.Result"
      :result="result"
      @close="resultClose"
    />
    <Ranking
      v-else-if="status === Status.Ranking"
      :result="result"
      :event="event"
    />
  </div>
</template>

<script>
import Title from '~/components/Title.vue'
import Game from '~/components/Game.vue'
import Result from '~/components/Result.vue'
import Ranking from '~/components/Ranking.vue'

export default {
  components: {
    Title,
    Game,
    Result,
    Ranking
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
      result: {},
      event: null,
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
      this.result = result
      this.status = this.Status.Result
    },
    resultClose() {
      this.status = this.Status.Ranking
    }
  }
}
</script>

<style lang="scss" scoped>
#main {
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
