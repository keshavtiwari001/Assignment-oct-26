const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

// databse connection 
const connectDB = require('./config/DB')
connectDB()

app.get('/', (req, res) => {
    res.status(200).send("HII, i'm server !!")
})

//  user routing
const userRoutes = require("./routes/userRoute")
app.use('/user', userRoutes)

// product routing
const prodRoutes = require('./routes/productRoute')
app.use('/products', prodRoutes)

// task routing
const taskRoutes = require('./routes/taskRoute')
app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
    console.log(`server is listening on port : ${PORT}`)
})