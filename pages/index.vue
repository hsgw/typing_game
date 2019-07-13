<template>
  <div class="container">
    <transition name="main" mode="out-in">
      <Title
        v-if="status === Status.Title"
        class="main"
        @press-start="startGame"
      />
      <Game
        v-else-if="status === Status.Game"
        class="main"
        :game-duration="gameDuration"
        @end="gameEnded"
      />
      <Result
        v-else-if="status === Status.Result"
        class="main"
        :result="result"
        @close="resultClosed"
      />
      <Ranking
        v-else-if="status === Status.Ranking"
        class="main"
        :result="result"
        @close="rankingClosed"
      />
    </transition>
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
    gameEnded(result) {
      this.result = result
      this.status = this.Status.Result
    },
    resultClosed() {
      this.status = this.Status.Ranking
    },
    rankingClosed() {
      this.result = {}
      this.status = this.Status.Title
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $black;
}

.main {
  background-color: $bg-color;
  color: $black;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main-enter-active {
  animation: enter 1s;
}

@keyframes enter {
  0% {
    transform: scale(0.2, 0.002);
    opacity: 0;
  }
  20% {
    transform: scale(1, 0.002);
    opacity: 0;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}

.main-leave-active {
  animation: leave 1s;
}

@keyframes leave {
  20% {
    transform: scale(1, 0.002);
  }
  70% {
    transform: scale(0.2, 0.002);
    opacity: 1;
  }
  100% {
    transform: scale(0.2, 0.002);
    opacity: 0;
  }
}
</style>
