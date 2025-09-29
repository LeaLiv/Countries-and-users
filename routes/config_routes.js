const indexR = require("./index")
const siteR = require("./site")
const userR = require("./users")
const countryR = require("./country")

exports.routesInit = (app) => {
    app.use("/", indexR)
    app.use("/site", siteR)
    app.use("/user", userR)
    app.use("/country", countryR)

}