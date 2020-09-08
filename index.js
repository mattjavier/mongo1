const mongojs = require('mongojs')
const db = mongojs('favorites_db')

db.movies.find({ director: 'Quentin Tarantino'}, (err, data) => {
  if (err) { console.log(err) }
  console.log(data)
})