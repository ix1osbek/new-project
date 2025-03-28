import { Router } from "express"
const router = Router()
router.get("/", (req, res) => {
    const token = req.cookies.token; // Cookie'dan tokenni olish
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

export default router