import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import { authRoutes, usersRoutes } from "./routes";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(cors({
    "origin": "http://localhost:5173",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
}));

app.use(morgan("dev"));

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", requiresAuth, usersRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;