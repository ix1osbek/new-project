import express from "express"
import dotenv from "dotenv"
import { create } from 'express-handlebars'
import authRoutes from "./routes/auth.js"
import productsRoutes from "./routes/products.js"
dotenv.config()
const app = express()
const hbs = create({ defaultLayout: "main", extname: "hbs" })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(authRoutes)
app.use(productsRoutes)

const PORT = process.env.PORT || 4100
app.listen(PORT, () => {
    console.log(`server is running at ${PORT} port`);

})