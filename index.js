require("dotenv").config({ path: "./.env" })

// Requires
const express = require("express")
const cors = require("cors")
const YAML = require("yamljs")
const swaggerUI = require("swagger-ui-express")
const bodyParser = require("body-parser")
const app = express()
const clothes = require("./src/clothes/routes")
const user = require("./src/user/routes")
const orders = require("./src/orders/routes")

// Cors
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
  })
)

// Middleware
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(express.static(__dirname))

// swagger
const swaggerJsDocs = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

app.use("/", clothes)
app.use("/", user)
app.use("/", orders)
app.listen(process.env.PORT_APP)
module.exports = app