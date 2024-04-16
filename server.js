const express = require("express")
const app = express()
const cors = require('cors')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// Routes
async function main(){
    app.use('/api/product', productRoute)

    app.get('/',(req,res)=>{
        res.send('Hello World!')
        
    })
    app.get('/blog',(req,res)=>{
        res.send('Hello blog')
    })

    app.use(errorMiddleware)
}

main()
    .then(async()=>{
        await prisma.$disconnect()
        console.log("Connected to MongoDB")
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })