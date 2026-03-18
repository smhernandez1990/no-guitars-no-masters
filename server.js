require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const morgan = require('morgan')
const methodOverride = require('method-override')
const authRoutes = require('./controllers/auth')
const userRoutes = require('./controllers/user')
const gearRoutes = require('./controllers/gear')
const path = require('path')

const session = require('express-session')
const MongoStore = require("connect-mongo")
const isSignedIn = require('./middleware/isSignedIn')
const passDataToView = require('./middleware/passDataToView')


require('./db/connection')
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

app.use(passDataToView)


app.get('/', (req, res) => {
    res.render('index', {
        user: req.session.user
    })
})

app.use('/gear', gearRoutes)
app.use('/auth', authRoutes)

app.use(isSignedIn)
app.use('/users', userRoutes)


app.listen(PORT, () => console.log(`The port is running on: ${PORT}`))