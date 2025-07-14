import cookieParser from "cookie-parser"
import express from "express"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import "dotenv/config"
import shortUrlRoute from "./routes/urlshortner.route.js"
import { connectToDB } from "./config/db.config.js"

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())

app.use("/",shortUrlRoute)



app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

async function runServer (){
    try {
        await connectToDB()
        app.listen(PORT,()=>{console.log(`server is listening on port: ${PORT}`)})
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

runServer()