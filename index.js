const express = require('express')
const ejs = require('ejs')
const path = require("path")

const app = express()
app.use(express.json())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const PORT = 3030

const matk1 = {
    nimetus: "Sügismatk Kõrvemaal",
    pildiUrl: "/assets/maed.png",
    kirjeldus: "Lähme ja oleme kolm päeva looduses",
    osalejad: ["mati@matkaja.ee", "kati@matkaja.ee"]
}

const matk2 = {
    nimetus: "Süstamatk Hiiumaal",
    pildiUrl: "/assets/maed.png",
    kirjeldus: "Lähme ja oleme kolm päeva vee peal",
    osalejad: ["mati@matkaja.ee", "kati@matkaja.ee", "uudo@ryhkija.ee"]
}

const matkad = [
    matk1,
    matk2,
    {
        nimetus: "Mägimatk Otepääl",
        pildiUrl: "/assets/maed.png",
        kirjeldus: "Lähme ja oleme kolm päeva mägedes",
        osalejad: ["uudo@ryhkija.ee"]
    }
]


app.get('/test', (req, res) => {res.end('kõik töötab!')})
app.use('/', express.static("public"))

app.get('/', (req, res)=> { res.render("esileht", {matkad: matkad}) })
app.get('/matk/:matkId', (req, res) => {
    const matkaIndex = req.params.matkId
    res.render("matk", { matk: matkad[matkaIndex] }) 
})

app.listen(PORT)