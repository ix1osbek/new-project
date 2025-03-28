import express from "express"
import dotenv from "dotenv"
import { create } from 'express-handlebars'
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import productsRoutes from "./routes/products.js"
import flash from "connect-flash"
import session from "express-session"
import cookieParser from "cookie-parser"
import { varMiddleware } from './middleware/var.js'; // varMiddleware to'g'ri import qilish

dotenv.config()
const app = express()
const hbs = create({ defaultLayout: "main", extname: "hbs" })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: "bek", resave: false, saveUninitialized: false }))
app.use(flash())
app.use(varMiddleware)

app.use(authRoutes)
app.use(productsRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDBga ulanish muvaffaqiyatli!');
    })
    .catch((error) => {
        console.error('MongoDBga ulanishda xato:', error);
    });

const PORT = process.env.PORT || 4100
app.listen(PORT, () => {
    console.log(`server is running at ${PORT} port`);

})
