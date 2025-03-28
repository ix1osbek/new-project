import jwt from "jsonwebtoken"

const generateJWTToken = (userId) => {
    const accsessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" })
    return accsessToken
}

export {generateJWTToken}