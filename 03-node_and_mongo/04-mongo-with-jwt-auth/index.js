const express = require("express")
const app = express()
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const errorMiddleware = require("./middleware/error")
const authenticateJWT = require("./jwtAuthMiddleware")

require("./db/index")

// Middleware for parsing request bodies
app.use(express.json())
app.use("/admin", authenticateJWT, adminRouter)
app.use("/user", authenticateJWT, userRouter)
app.use(errorMiddleware)

const PORT = 3000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
