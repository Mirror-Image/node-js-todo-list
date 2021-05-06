const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todosRoutes = require('./rotes/todos')
require('dotenv').config()

const {SERVER_PORT, DB_HOST, DB_USER, DB_PASS} = process.env

const PORT = SERVER_PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todosRoutes)


async function start() {
  try {
    await mongoose.connect(
      `${DB_HOST}`,
      {
        auth: {
          user: `${DB_USER}`,
          password: `${DB_PASS}`
        },
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    )

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })

  } catch (e) {
    console.log(e);
  }
}

start()
