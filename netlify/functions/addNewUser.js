const cloudinary = require("cloudinary").v2;
const sanitizeHtml = require("sanitize-html");
const getDBClient = require("../../our-library/getDBClient");
const isAdmin = require("../../our-library/idAdmin");

const cloudinaryConfig = cloudinary.config({
    cloud_name: "dse1pm8ep",
    api_key: "895939763579678",
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})

function cleanUp(x) {
    return sanitizeHtml(x, {
        allowedTags: [],
        allowedAttributes: {},
    });
}

const handler = async (event) => {
    const body = JSON.parse(event.body);

    if (typeof body.name != "string") {
        body.name = "";
    }

    if (typeof body.description != "string") {
        body.description = "";
    }

    
    let inputData = {
        fullName: cleanUp(body.fullName),
        username: cleanUp(body.username),
        email: cleanUp(body.email),
        gender: cleanUp(body.gender),
        dateOfBirth: cleanUp(new Date().getFullYear()),
        password: cleanUp(body.password),
        country: cleanUp(body.country),
        stateProvince: cleanUp(body.stateProvince),
        city: cleanUp(body.city),
        phoneNumber: cleanUp(body.phoneNumber),
        whatsapp: cleanUp(body.whatsapp),
    };
    if (body.birthYear > 1900 && body.birthYear <= new Date().getFullYear()) {
        inputData.birthYear = body.dateOfBirth;

    }
    if (body.gender != "male" && body.gender != "female") {
        inputData.gender = "male";
    }

    const expetedSignature = cloudinary.utils.api_sign_request({ public_id: body.public_id, version: body.version }, cloudinaryConfig.api_secret);
    if (expetedSignature === body.signature) {
        inputData.photo = body.public_id
    }

    if (isAdmin(event)) {
        const client = await getDBClient();
        await client.db().collection("pets").insertOne(inputData);
        client.close();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: true }),
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false }),
    };
};
module.exports = { handler };
