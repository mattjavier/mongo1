const mongojs = require('mongojs')
const db = mongojs('favorites_db')
const { prompt } = require('inquirer')

const buildMovie = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this movie?'
    },
    {
      type: 'number',
      name: 'release',
      message: 'What year was this movie released?'
    },
    {
      type: 'input',
      name: 'director',
      message: 'Who is the director?'
    }
  ])
    .then(({ title, release, director }) => {
      db.movies.insert({
        title: title,
        release: release,
        director: director
      }, err => {
        if (err) { console.log(err) }
        console.log('Movie Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

const buildSong = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this song?'
    },
    {
      type: 'input',
      name: 'artist',
      message: 'Who is the artist?'
    }
  ])
    .then(({ title, artist }) => {
      db.songs.insert({
        title: title,
        artist: artist
      }, err => {
        if (err) { console.log(err) }
        console.log('Song Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

const buildGame = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this game?'
    },
    {
      type: 'number',
      name: 'release',
      message: 'What year was this game released?'
    }
  ])
    .then(({ title, release }) => {
      db.games.insert({
        title: title,
        release: release
      }, err => {
        if (err) { console.log(err) }
        console.log('Game Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}

const buildFood = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of this food?'
    },
    {
      type: 'input',
      name: 'type',
      message: 'What type of food is this?'
    }
  ])
    .then(({ name, type }) => {
      db.foods.insert({
        name: name,
        type: type
      }, err => {
        if (err) { console.log(err) }
        console.log('Food Added!')
        start()
      })
    })
    .catch(err => console.log(err))
}


const newItem = () => {
  prompt({
    type: 'list',
    name: 'collection',
    message: 'Which collection would this item be under?',
    choices: ['Movies', 'Songs', 'Games', 'Foods']
  })
    .then(({ collection }) => {
      switch (collection) {
        case 'Movies':
          buildMovie()
          break
        case 'Songs':
          buildSong()
          break
        case 'Games':
          buildGame()
          break
        case 'Foods':
          buildFood()
          break
      }
    })
    .catch(err => console.log(err))
}

const view = () => {
  prompt({ 
    type: 'list',
    name: 'collection',
    message: 'View Favorite: ',
    choices: ['Movies', 'Songs', 'Games', 'Foods']
  })
    .then(({ collection }) => {
      switch (collection) {
        case 'Movies':
          db.movies.find((err, data) => {
            if (err) { console.log(err) }
            data = data.map(movie => `${movie.title} (${movie.release}) directed by ${movie.director}`)
            console.log(data)
            start()
          })
          break
        case 'Songs':
          db.songs.find((err, data) => {
            if (err) { console.log(err) }
            data = data.map(song => `${song.title} - ${song.artist}`)
            console.log(data)
            start()
          })
          break
        case 'Games':
          db.games.find((err, data) => {
            if (err) { console.log(err) }
            data = data.map(game => `${game.title} (${game.release})`)
            console.log(data)
            start()
          })
          break
        case 'Foods':
          db.foods.find((err, data) => {
            if (err) { console.log(err) }
            data = data.map(food => `${food.name} (${food.type})`)
            console.log(data)
            start()
          })
          break
      }
    })
    .catch(err => console.log(err))
}

const start = () => {
  prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['Enter new item', 'View items']
  })
    .then(({ choice }) => {
      switch (choice) {
        case 'Enter new item': 
          newItem()
          break
        case 'View items':
          view()
          break
      }
    })
    .catch(err => console.log(err))
}

start()