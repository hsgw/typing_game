<template>
  <div id="enterRanking">
    <div class="panel">
      <h1>Your Rank is</h1>
      <h1 class="ranking">
        # {{ myRank }} <span> / {{ total }} </span>
      </h1>
      <form @submit.prevent="submit">
        <input v-model="name" type="text" class="input" placeholder="Name" />
        <input
          v-model="keyboard"
          type="text"
          class="input"
          placeholder="Keyboard"
          autocomplete="on"
          list="keyboard"
        />
        <datalist id="keyboard">
          <option v-for="n in ['Plaid', 'Tartan', 'Lain']" :key="n">
            {{ n }}
          </option>
        </datalist>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnterRanking',
  props: { myRank: Number, total: Number },
  data() {
    return {
      name: '',
      keyboard: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit', { name: this.name, keyboard: this.keyboard })
    }
  }
}
</script>

<style lang="scss" scoped>
#enterRanking {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    span {
      font-size: 3rem;
      font-weight: normal;
    }
  }
  .panel {
    font-size: 3rem;
    padding: 50px;
    background-color: white;
    border-color: $black;
    border: 30px solid;
    form {
      display: flex;
      flex-direction: column;
      input {
        padding: 0.5rem;
        margin-bottom: 1rem;
        font-size: 2rem;
      }
      datalist {
        option {
          font-size: 2rem;
        }
      }
      button {
        background-color: $black;
        padding: 0.5rem;
        color: white;
        font-size: 2rem;
        border-style: none;
        &:hover {
          background-color: grey;
        }
      }
    }
  }
}
</style>
