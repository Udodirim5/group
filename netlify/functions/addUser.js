const { MongoClient } = require("mongodb");

const handler = async (event) => {
    const client = new MongoClient(process.env.CONNECTIONSTRING)
    await client.connect()

    const users = await client.db().collection('adminUsers').find().toArray();
    client.close();


    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(users),
    };
};
module.exports = { handler };
