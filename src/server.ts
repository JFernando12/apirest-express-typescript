import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import postsRoutes from "./routes/postsRoutes";

class Server {

    public app: Application;
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = "mongodb://localhost:27017/restapi";
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI)
            .then(db => console.log("DB in connected: ", db.connections[0].host))
            .catch(err => console.log(err));
        //Settings
        this.app.set("port", 4000 || process.env.PORT);
        //Middlewares
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use("/api/posts", postsRoutes)
    }

    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port: ", this.app.get("port"))
        })
    }

}

const server = new Server();
server.start();
