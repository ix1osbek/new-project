import { Router } from "express"
import Product from "../models/Product.js";
const router = Router()
router.get("/", (req, res) => {
    const token = req.cookies.token
    const isLoggedIn = token ? true : false;
    res.render("index", {
        title: "Erkinov SHOP",
        token: isLoggedIn
    })

})

router.get("/products", (req, res) => {
    res.render("products", {
        title: "products",
        isProducts: true
    })
})

router.get("/add", (req, res) => {
    res.render("add", {
        title: "add",
        isAdd: true
    })
})

router.post("/add-products", async (req, res) => {
    const { title, description, image, price } = req.body
    const products = await Product.create(req.body)
    console.log(products);
    
    res.redirect("/")

})

export default router