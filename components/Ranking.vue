<template>
  <div class="scoreBoard">
    <div class="inner">
      <div v-for="(data, i) in top5" :key="i" class="item top5">
        <div class="rank">{{ i + 1 }}</div>
        <div class="score">{{ data.score }}</div>
        <div class="speed">
          <span class="value">{{ data.speed }}</span>
          <span class="unit">wpm</span>
        </div>
        <div class="name">{{ data.name }}</div>
        <div class="keyboard">{{ data.keyboard }}</div>
      </div>
    </div>
    <div v-if="below" class="inner sub">
      <div v-for="(data, i) in above" :key="i + 5" class="item sub">
        <div class="rank">{{ myRank + i - 4 }}</div>
        <div class="score">{{ data.score }}</div>
        <div class="name">{{ data.name }}</div>
        <div class="keyboard">{{ data.keyboard }}</div>
      </div>
      <div class="item sub myrank">
        <div class="rank">{{ myRank }}</div>
        <div class="score">{{ result.score }}</div>
        <div class="name">{{ result.name }}</div>
        <div class="keyboard">{{ result.keyboard }}</div>
      </div>
      <div v-for="(data, i) in below" :key="i + 10" class="item sub">
        <div class="rank">{{ myRank + i + 1 }}</div>
        <div class="score">{{ data.score }}</div>
        <div class="name">{{ data.name }}</div>
        <div class="keyboard">{{ data.keyboard }}</div>
      </div>
    </div>
    <div v-else class="inner sub">
      <div v-for="(data, i) in below5" :key="i + 6" class="item sub">
        <div class="rank">{{ i + 6 }}</div>
        <div class="score">{{ data.score }}</div>
        <div class="name">{{ data.name }}</div>
        <div class="keyboard">{{ data.keyboard }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '~/components/ranking.js'

export default {
  name: 'Ranking',
  props: { result: Object, event: String },
  data: function() {
    return {
      top5: null,
      below5: null,
      myRank: null,
      above: null,
      below: null
    }
  },
  computed: {},
  async created() {
    this.top5 = await db.getTop(5)
    this.below5 = await db.getTop(14).then(result => {
      return result.slice(5)
    })
    if (this.result.score) {
      this.myRank = await db.getRank(this.result.score)
      this.above = await db.getAbove(this.result.score)
      this.below = await db.getbelow(this.result.score)
    }
  }
}
</script>

<style lang="scss" scoped>
#ranking {
  display: flex;
  flex-direction: row;
}
.scoreBoard {
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  .inner {
    display: flex;
    flex-direction: column;
    &.sub {
      height: 34rem;
      overflow: hidden;
    }
    .item {
      display: grid;
      align-items: center;
      margin: 0.2rem;
      &.top5 {
        grid-template-columns: 6rem 7rem 1fr;
        grid-template-rows: 3rem 3rem;
        grid-template-areas: 'rank score name' 'rank speed keyboard';
        border: 3px solid;
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
        &.myrank {
          color: $typing-typo-color;
        }
      }
    }
  }
}
</style>
