// const cloudinary = require("cloudinary").v2;
// const sanitizeHtml = require("sanitize-html");
// const getDBClient = require("../../our-library/getDBClient");
// // const isAdmin = require("../../our-library/idAdmin");

// const cloudinaryConfig = cloudinary.config({
//     cloud_name: "dse1pm8ep",
//     api_key: "895939763579678",
//     api_secret: process.env.CLOUDINARY_SECRET,
//     secure: true
// });

// function cleanUp(x) {
//     return sanitizeHtml(x, {
//         allowedTags: [],
//         allowedAttributes: {},
//     });
// }

// const handler = async (event) => {
//     const body = JSON.parse(event.body);

//     if (typeof body.fullName != "string") {
//         body.fullName = "";
//     }

//     if (typeof body.username != "string") {
//         body.username = "";
//     }

//     if (typeof body.email != "string") {
//         body.email = "";
//     }

//     if (typeof body.gender != "string") {
//         body.gender = "";
//     }

//     if (typeof body.dateOfBirth != "string") {
//         body.dateOfBirth = new Date().getFullYear();
//     }

//     if (typeof body.password != "string") {
//         body.password = "";
//     }

//     if (typeof body.country != "string") {
//         body.country = "";
//     }

//     if (typeof body.stateProvince != "string") {
//         body.stateProvince = "";
//     }

//     if (typeof body.city != "string") {
//         body.city = "";
//     }

//     if (typeof body.phoneNumber != "string") {
//         body.phoneNumber = "";
//     }

//     if (typeof body.whatsapp != "string") {
//         body.whatsapp = "";
//     }

//     let inputData = {
//         fullName: cleanUp(body.fullName),
//         username: cleanUp(body.username),
//         email: cleanUp(body.email),
//         gender: cleanUp(body.gender),
//         dateOfBirth: cleanUp(body.dateOfBirth),
//         password: cleanUp(body.password),
//         country: cleanUp(body.country),
//         stateProvince: cleanUp(body.stateProvince),
//         city: cleanUp(body.city),
//         phoneNumber: cleanUp(body.phoneNumber),
//         whatsapp: cleanUp(body.whatsapp),
//     };

//     // You might need to adjust the conditions and validation rules according to your requirements
//     if (body.birthYear > 1900 && body.birthYear <= new Date().getFullYear()) {
//         inputData.birthYear = body.dateOfBirth;
//     }

//     if (body.gender !== "male" && body.gender !== "female") {
//         inputData.gender = "male";
//     }

//     const expetedSignature = cloudinary.utils.api_sign_request({ public_id: body.public_id, version: body.version }, cloudinaryConfig.api_secret);
//     if (expetedSignature === body.signature) {
//         inputData.photo = body.public_id;
//     }

//     if (isAdmin(event)) {
//         try {
//             const client = await getDBClient();
//             await client.db().collection("users").insertOne(inputData);
//             client.close();

//             return {
//                 statusCode: 200,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ success: true }),
//             };
//         } catch (error) {
//             console.error("Error inserting user data:", error);
//             return {
//                 statusCode: 500,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ success: false, error: "Internal server error" }),
//             };
//         }
//     }

//     return {
//         statusCode: 403,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ success: false, error: "Unauthorized access" }),
//     };
// };

// module.exports = { handler };












const { MongoClient } = require('mongodb');
const sanitizeHtml = require('sanitize-html');

async function cleanUp(body) {
    const inputData = {};

    inputData.fullName = sanitizeHtml(body.fullName || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.username = sanitizeHtml(body.username || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.email = sanitizeHtml(body.email || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.gender = sanitizeHtml(body.gender || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.dateOfBirth = sanitizeHtml(body.dateOfBirth || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.password = sanitizeHtml(body.password || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.country = sanitizeHtml(body.country || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.stateProvince = sanitizeHtml(body.stateProvince || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.city = sanitizeHtml(body.city || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.phoneNumber = sanitizeHtml(body.phoneNumber || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    inputData.whatsapp = sanitizeHtml(body.whatsapp || '', {
        allowedTags: [],
        allowedAttributes: {},
    });

    if (body.birthYear > 1900 && body.birthYear <= new Date().getFullYear()) {
        inputData.birthYear = body.dateOfBirth;
    }

    if (body.gender !== 'male' && body.gender !== 'female') {
        inputData.gender = 'male';
    }

    return inputData;
}

async function handler(event) {
    const body = JSON.parse(event.body);

    const inputData = await cleanUp(body);

    try {
        const client = new MongoClient("mongodb+srv://adminUserList:teDHVmh7myrNouHU@adminusers.k7gmi5z.mongodb.net/dpsGroup?retryWrites=true&w=majority&appName=adminUsers", { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db("dpsGroup");
        const result = await db.collection('users').insertOne(inputData);

        client.close();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, insertedId: result.insertedId, redirectTo: '/admin/admin-user' }),
        };
    } catch (error) {
        console.error('Error inserting user data:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: false, error: 'Internal server error' }),
        };
    }
}

module.exports = { handler };
