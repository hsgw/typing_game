<template>
  <div id="ranking">
    <div>
      <EnterRanking
        v-if="!entered"
        :my-rank="myRank"
        :total="rankingTotal"
        @submit="enterRanking"
      />
      <Scoreboard v-else :my-rank="myRank" />
    </div>
    <div class="description animation">Press any key to return title</div>
  </div>
</template>

<script>
import EnterRanking from '~/components/EnterRanking.vue'
import Scoreboard from '~/components/Scoreboard.vue'
import db from '~/components/db.js'

export default {
  name: 'Ranking',
  components: { EnterRanking, Scoreboard },
  props: { result: Object, eventName: String },
  data: function() {
    return {
      myRank: null,
      entered: false,
      rankingTotal: 0
    }
  },
  computed: {},
  async created() {
    this.myRank = await db.getRank(this.result.score)
    this.rankingTotal = (await db.getCount()) + 1
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkey)
  },
  methods: {
    async enterRanking({ name, keyboard }) {
      await db.addEntry({
        name: name,
        keyboard: keyboard,
        result: this.result,
        event: this.eventName
      })
      this.entered = true
      setTimeout(() => {
        window.addEventListener('keydown', this.onkey)
      }, 1000)
    },
    onkey(e) {
      window.removeEventListener('keydown', this.onkey)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
#ranking {
  flex-direction: column;
}

@keyframes blink {
  to,
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.description {
  opacity: 0;
  margin-top: 2rem;
  font-size: 2rem;
  &.animation {
    opacity: 0;
    animation: blink 1s step-end infinite;
    animation-delay: 1s;
  }
}
</style>
