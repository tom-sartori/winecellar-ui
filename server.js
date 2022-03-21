const express = require('express')
const PORT = process.env.PORT || 8080
const app = express();

app.use(express.static(__dirname + "/dist/"))
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})
app.listen(PORT)

console.log("Server started. http://localhost:" + PORT)
