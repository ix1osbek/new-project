import { Router } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import { generateJWTToken } from "../services/token.js"
const router = Router()

router.get("/login", (req, res) => {
    res.render("login", {
        title: "login",
        isLogin: true,
        loginError: req.flash("loginError")
    })
})

router.get("/register", (req, res) => {
    res.render("register", {
        title: "register",
        isRegister: true,
        registerError: req.flash("registerError")
    })
})

router.get("/logout" , (req , res)=>{
    res.clearCookie("token")
    res.redirect("/")
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash("loginError", "All fields is required!")
        res.redirect("/login")
        return
    }
    const axistUser = await User.findOne({ email })
    if (!axistUser) {
        req.flash("loginError", "User not found!")
        res.redirect("/login")
        return
    }
    const isPassEqual = await bcrypt.compare(password, axistUser.password)
    if (!isPassEqual) {
        req.flash("loginError", "Password wrong")
        res.redirect("/login")
        return

    }

    const token = generateJWTToken(axistUser._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.redirect("/")
})

router.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    }


    const { email, password, firstname, lastname } = req.body

    if (!email || !password || !firstname || !lastname) {
        req.flash("registerError", "Iltimos barcha bo'sh joylar to'ldirilishi shart!")
        res.redirect("/register")
        return
    }

    const candidata = await User.findOne({ email })
    if (candidata) {
        req.flash("registerError", "Ushbu foydalanuvchi allaqachon mavjud!")
        res.redirect("/register")
        return
    }


    const user = await User.create(userData)
    const token = generateJWTToken(user._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.redirect("/")
})
export default router