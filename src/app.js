// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";


// // const app = express();
// // app.use(express.static('dist'))

// // app.use(cors({
// //     origin: process.env.CORS_ORIGIN,
// //     credentials: true
// // }));

// // //everything frontend sends to backend is in json format express converts to json
// // app.use(express.json({
// //     limit: "16kb"
// // }));

// // //the complex url is decoded by the express and stored in req.body
// // app.use(express.urlencoded({
// //     extended: true,
// //     limit: "16kb"
// // }));

// // app.use(express.static("public"));

// // app.use(cookieParser());


// // import userRoute from "./routes/user.routes.js";

// // app.use("/api/v1/user", userRoute);


// // export { app };
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url'

// // Resolve __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, 'dist')));

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

// // Everything frontend sends to backend is in JSON format; express converts it to JSON
// app.use(express.json({
//     limit: "16kb"
// }));

// // The complex URL is decoded by express and stored in req.body
// app.use(express.urlencoded({
//     extended: true,
//     limit: "16kb"
// }));

// // Serve additional static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(cookieParser());

// import userRoute from "./routes/user.routes.js";

// app.use("/api/v1/user", userRoute);

// // For any other routes, serve the index.html file from the 'dist' directory
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// export { app };
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url'
import mongoose from "mongoose";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Everything frontend sends to backend is in JSON format; express converts it to JSON
app.use(express.json({
    limit: "16kb"
}));

// The complex URL is decoded by express and stored in req.body
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

import userRoute from "./routes/user.routes.js";

app.use("/api/v1/user", userRoute);

// Handle unknown API routes with a 404 JSON response
app.use("/api/*", (req, res) => {
    res.status(404).json({ message: "API route not found" });
});

app.get("/test-db", async (req, res) => {
    try {
        const isConnected = mongoose.connection.readyState === 1;
        res.json({ message: isConnected ? "Connected to MongoDB" : "Not connected" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export { app };
