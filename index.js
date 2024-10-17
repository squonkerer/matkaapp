const express = require('express')
const ejs = require('ejs')
const path = require("path")
const PORT = process.env.PORT || 3000
const app = express()
//app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true }))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const {lisaMatk} = require("./model")

function news(req, res) {
    res.render("news", {data: data})
}
function newsSingle(req, res) {
    res.render("newsSingle", {data: data})
}

function kontakt(req, res) {
    res.render("kontakt", {messages: messages})
}

const matk1 = {
    nimetus: "Sügismatk Kõrvemaal",
    pildiUrl: "/assets/maed.png",
    kirjeldus: "Lähme ja oleme kolm päeva looduses",
    osalejad: []
}

const matk2 = {
    nimetus: "Süstamatk Hiiumaal",
    pildiUrl: "/assets/maed.png",
    kirjeldus: "Lähme ja oleme kolm päeva vee peal",
    osalejad: []
}

const matkad = [
    matk1,
    matk2,
    {
        nimetus: "Mägimatk Otepääl",
        pildiUrl: "/assets/maed.png",
        kirjeldus: "Lähme ja oleme kolm päeva mägedes",
        osalejad: []
    }
]

const data1 = {
    title: 'Test1',
    imageUrl: '/assets/Butterfly.png',
    description: 'This is a short description',
    buttonUrl: '/news'
  };

const data2 = {
    title: 'Test2',
    imageUrl: '/assets/Butterfly2.png',
    description: 'This is a short description',
    buttonUrl: '/news'
  };

const data = [
    data1,
    data2,
    {
        title: 'Test3',
        imageUrl: '/assets/Hiker.png',
        description: 'This is a short description',
        buttonUrl: '/news',
    }
]

const messages = []

function registerMatkale(name, email, matkaIndex) {
    if (matkaIndex > matkad.length){
        console.log('wrong index')
        return
    }
    const matk = matkad[matkaIndex]
    const uusMatkaja = {
        name: name,
        email: email,
        registerTime: new Date(),
    }
    matk.osalejad.push(uusMatkaja)
    console.log(matkad)
}

function writeMessage(name, text) {
    const newMessage = {
        name: name,
        text: text,
    }
    messages.push(newMessage)
    console.log(messages)
}

app.get('/news', news)
app.get('/kontakt', kontakt)
app.use('/', express.static("public"))

app.get('/news/:id', (req, res) => {
    const newsIndex = req.params.id;
    const news = data[newsIndex];

    if (news) {
        res.render('newsSingle', { news });
    } else {
        res.status(404).send('Story not found');
    }
});

app.post('/newMessage', (req, res) => {
    console.log(req.body)
    writeMessage(
        req.body.name,
        req.body.text,
    )
    res.render('newMessage', {name: req.body.name})
})

app.post('/register', (req, res) => {
    console.log(req.body)
    registerMatkale(
        req.body.name,
        req.body.email,
        req.body.matkaIndex
    )
    res.render('regConfirm', {matk: matkad[req.body.matkaIndex], name: req.body.name})
})

app.get('/', (req, res)=> { res.render("esileht", {matkad: matkad}) })
app.get('/matk/:matkId', (req, res) => {
    const matkaIndex = req.params.matkId
    res.render("matk", { matk: matkad[matkaIndex], id: matkaIndex }) 
})

app.get('/api/lisaMatk', (req, res)=>{
    const uusMatk = {
        nimetus : req.query.nimi
    }
    lisaMatk(uusMatk)
    res.end('added')
})

app.listen(PORT)