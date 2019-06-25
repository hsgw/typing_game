import Dexie from 'dexie'

const db = new Dexie('typingGame')
db.version(1).stores({
  ranking: '++id, date, name, keyboard, score, speed, event'
})

export default {
  addEntry(entry) {
    return db.ranking.add({
      name: entry.name ? entry.name : 'anonymous',
      keyboard: entry.keyboard ? entry.keyboard : 'unknown',
      score: entry.result.score,
      speed: entry.result.speed,
      event: entry.event,
      date: Date.now()
    })
  },

  getAll() {
    return db.ranking
      .orderBy('score')
      .reverse()
      .toArray()
  },

  getTop(stop) {
    return db.ranking
      .orderBy('score')
      .reverse()
      .limit(stop)
      .toArray()
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

  getAbove(score, num = 4) {
    return db.ranking
      .where('score')
      .aboveOrEqual(score)
      .limit(num)
      .toArray()
      .then(result => {
        return result.sort((a, b) => {
          return a.score > b.score ? -1 : 1
        })
      })
  },

  getbelow(score, num = 4) {
    return db.ranking
      .where('score')
      .below(score)
      .reverse()
      .limit(num)
      .toArray()
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
