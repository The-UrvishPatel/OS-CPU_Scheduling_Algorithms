require('express-async-errors')
const express = require('express')
const app = express()
const routes = require('./routes/routes')
const notFoundError  = require('./middlewares/not-found')
const errorHandler  = require('./middlewares/error-handler')


//middlewares

app.use(express.static('./public'))
app.use(express.json())


app.get('/urvish',(req,res)=>{

    console.log(res)
    res.urvish = "urvish"
    res.send('this is urvish')
})

//routes
app.use('/api/scheduling',routes)


//errors
app.use(notFoundError)
app.use(errorHandler)


const port = process.env.PORT || 3000

app.listen(port,()=>console.log(`Server is listening on port ${port}`))
