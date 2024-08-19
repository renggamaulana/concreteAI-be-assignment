const supertokens = require("supertokens-node");
const { middleware, errorHandler } = require("supertokens-node/framework/fastify");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

supertokens.init({
    framework: "fastify",
    supertokens: {
        connectionURI: "https://try.supertokens.io", // Atau URL server SuperTokens yang Anda gunakan
        apiKey: "API_KEY", // Jika diperlukan
    },
    appInfo: {
        appName: "My App",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // Menggunakan otentikasi email dan password
        Session.init() // Untuk session management
    ],
});
