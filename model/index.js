const { MongoClient } = require("mongodb")



const andmebaas = "matkaklubi"
const password = "G4LXCaI9aQg2Z298"
const mongoUrl = `mongodb+srv://matkaklubi:${password}@cluster0.ht743.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);


async function lisaMatk(uusMatk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(uusMatk)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } finally {
        await client.close();
      }     
}

module.exports = {
    lisaMatk,
}