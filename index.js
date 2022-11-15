const express = require("express");
const app = express();
const PORT = 8080;


app.get("/", (_req, res) => {
    res.send("<h1>Wassup</h1>")
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}! You better go catch it`)
})