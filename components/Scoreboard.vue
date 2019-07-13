<template>
  <div>
    <div id="scoreBoard">
      <div class="inner">
        <div
          v-for="(data, i) in top5"
          :key="i"
          class="item top5"
          :class="myRank === i ? 'myRank' : ''"
        >
          <div class="rank">{{ i + 1 }}</div>
          <div class="score">{{ data.score }}</div>
          <div class="speed">
            <span class="value">{{ data.speed }}</span>
            <span class="unit">wpm</span>
          </div>
          <div class="name">{{ data.name }}</div>
          <div class="keyboard">{{ data.keyboard }} / {{ data.lang }}</div>
        </div>
      </div>
      <div v-if="aroundMyRank" class="inner sub">
        <div
          v-for="(data, i) in aroundMyRank"
          :key="i + 5"
          class="item sub"
          :class="myRank === myRank + i - 4 ? 'myrank' : ''"
        >
          <div class="rank">{{ myRank + i - 4 }}</div>
          <div class="score">{{ data.score }}</div>
          <div class="name">{{ data.name }}</div>
          <div class="keyboard">{{ data.keyboard }} / {{ data.lang }}</div>
        </div>
      </div>
      <div v-else class="inner sub">
        <div v-for="(data, i) in below5" :key="i + 5" class="item sub">
          <div class="rank">{{ i + 6 }}</div>
          <div class="score">{{ data.score }}</div>
          <div class="name">{{ data.name }}</div>
          <div class="keyboard">{{ data.keyboard }} / {{ data.lang }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '~/components/db.js'

export default {
  name: 'Scoreboard',
  props: { myRank: Number },
  data() {
    return {
      top: null,
      aroundMyRank: null
    }
  },
  computed: {
    top5() {
      if (!this.top) return []
      return this.top.slice(0, 5)
    },
    below5() {
      if (!this.top) return []
      return this.top.slice(5, 14)
    }
  },
  async created() {
    this.top = await db.getTop(15)
    if (this.myRank > 5) {
      this.aroundMyRank = await db.getRankAround(this.myRank, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
#ranking {
  display: flex;
  flex-direction: row;
}
#scoreBoard {
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  .inner {
    display: flex;
    flex-direction: column;
    &.sub {
      overflow: hidden;
    }
    .myrank {
      color: $typing-typo-color;
    }
    .item {
      display: grid;
      align-items: center;
      margin: 0.2rem;
      border-color: $black;
      &.top5 {
        grid-template-columns: 6rem 7rem 1fr;
        grid-template-rows: 3rem 3rem;
        grid-template-areas: 'rank score name' 'rank speed keyboard';
        border: 8px solid;
        div {
          padding: 0 0.5rem;
        }
        .rank {
          grid-area: rank;
          font-size: 4rem;
        }
        .score {
          grid-area: score;
          font-size: 2.5rem;
        }
        .name {
          grid-area: name;
        }
        .keyboard {
          grid-area: keyboard;
          font-size: 2rem;
        }
        .speed {
          grid-area: speed;
          font-size: 1.5rem;
          .unit {
            font-size: 1rem;
          }
        }
      }
      &.sub {
        grid-template-columns: 4rem 5rem 1fr;
        grid-template-rows: 1.5rem 1.5rem;
        grid-template-areas: 'rank score name' 'rank score keyboard';
        border: 2px solid;
        font-size: 1.5rem;
        .rank {
          grid-area: rank;
          font-size: 2rem;
        }
        .score {
          grid-area: score;
        }
        .name {
          grid-area: name;
          padding: 0 1rem;
        }
        .keyboard {
          grid-area: keyboard;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
