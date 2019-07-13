import Dexie from 'dexie'

const db = new Dexie('typingGame')
db.version(1).stores({
  ranking: '++id, date, name, keyboard, score, speed, event'
})
db.version(2)
  .stores({
    ranking: '++id, date, name, keyboard, score, speed, event, lang'
  })
  .upgrade(trans => {
    return trans.ranking.toCollection().modify(item => {
      item.lang = ''
    })
  })

export default {
  addEntry(entry) {
    console.log(entry)
    return db.ranking.add({
      name: entry.name ? entry.name : 'anonymous',
      keyboard: entry.keyboard ? entry.keyboard : 'unknown',
      score: entry.result.score,
      speed: entry.result.speed,
      event: entry.event,
      lang: entry.result.lang,
      date: Date.now()
    })
  },

  getAll() {
    return db.ranking.toArray().then(array => {
      array.sort((a, b) => {
        if (a.score > b.score) return -1
        else if (a.score < b.score) return 1
        else if (a.id < b.id) return -1
        else return 1
      })
      return Promise.resolve(array)
    })
  },

  getCount() {
    return this.getAll().then(array => {
      return array.length
    })
  },

  getTop(stop) {
    return this.getAll().then(array => {
      return array.slice(0, stop)
    })
  },

  getRankAround(rank, num = 9) {
    return this.getAll().then(array => {
      return array.slice(
        rank - Math.ceil(num / 2),
        rank - Math.ceil(num / 2) + num
      )
    })
  },

  getRank(score) {
    return db.ranking
      .where('score')
      .aboveOrEqual(score)
      .count()
      .then(count => {
        return count + 1
      })
  },

  addTestEntry(num) {
    const testEntry = []
    for (let i = 0; i < num; i++) {
      testEntry.push({
        name: 'anonymous',
        keyboard: 'unknown',
        score: i * 10,
        speed: Math.round(Math.random() * 100 * 100) / 100,
        event: 'test',
        date: Date.now()
      })
    }
    return db.ranking.bulkAdd(testEntry)
  }
}
