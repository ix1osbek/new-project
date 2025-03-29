import { Router } from "express"
import Product from "../models/Product.js";
import authMiddleware from "../middleware/auth.js";
import usermiddleware from "../middleware/user.js";
const router = Router()
router.get("/", async (req, res) => {
    const products = await Product.find().lean()
    const token = req.cookies.token
    const isLoggedIn = token ? true : false;
    res.render("index", {
        title: "Erkinov SHOP",
        token: isLoggedIn,
        products: products,
    })

})

router.get("/products", (req, res) => {
    res.render("products", {
        title: "products",
        isProducts: true
    })
})

router.get("/add", authMiddleware, (req, res) => {

    res.render("add", {
        title: "add",
        isAdd: true,
        erroraddProducts: req.flash("erroraddProducts")
    })
})

router.post("/add-products", usermiddleware, async (req, res) => {
    const { title, description, image, price } = req.body
    if (!title || !description || !image || !price) {
        req.flash("erroraddProducts", "Iltimos barcha bo'sh joylar to'ldirilishi shart!")
        res.redirect("/add")
        return
    }
    await Product.create({ ...req.body, user: req.userId })


    res.redirect("/")

})

export default router