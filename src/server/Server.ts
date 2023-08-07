import express from "express";
import "dotenv/config";

import { router } from "./routes";

const server = express();

// passa para aplicação que estamos usando o json
server.use(express.json());

// traz todas as rotas para uso
server.use(router);

export { server };
