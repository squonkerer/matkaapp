const { MongoClient } = require("mongodb")



const andmebaas = "matkaklubi"
const password = process.env.MONGO_PWD
const mongoUrl = `mongodb+srv://matkaklubi:${password}@cluster0.ht743.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);


async function lisaMatk(uusMatk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(uusMatk)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } catch (error) {
        console.error("Error inserting matk:", error);
      } finally {
        await client.close();
    }
}

async function registerMatkale(name, email, matkaIndex) {
  try {
      await client.connect();
      const database = client.db(andmebaas);
      const matkad = database.collection("matkad");
      const matkadList = await matkad.find().toArray();
      if (matkaIndex >= matkadList.length) {
          console.log('Wrong index');
          return;
      }
      const selectedMatk = matkadList[matkaIndex];
      if (!selectedMatk.osalejad) {
          selectedMatk.osalejad = [];
      }
      const uusMatkaja = {
          name: name,
          email: email,
          registerTime: new Date(),
      };
      selectedMatk.osalejad.push(uusMatkaja);
      await matkad.updateOne(
          { _id: selectedMatk._id }, 
          { $set: { osalejad: selectedMatk.osalejad } }
      );
      console.log(`Updated matk with new participant: ${name}`);
  } catch (error) {
      console.error("Error registering for matk:", error);
  } finally {
      await client.close();
  }
}

/*async function addRegistation(newRegistation) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("registration");
        const result = await matkad.insertOne(uusMatkaja)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } catch (error) {
        console.error("Error inserting matk:", error);
      } finally {
        await client.close();
    }
}*/

module.exports = {
    lisaMatk,
    registerMatkale,
    //addRegistation,
}