import { Router } from "express"
const router = Router()

router.get("/login", (req, res) => {
    res.render("login" , {
        title : "login",
        isLogin: true
    })
})

router.get("/register", (req, res) => {
    res.render("register" , {
        title: "register",
        isRegister: true
    })
})
export default router