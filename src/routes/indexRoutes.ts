import { Router, Request, Response } from "express";

class indexRoutes {
    
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/", (req, res) => {
            res.send("Helloooo")
        })
    }

}

const routes = new indexRoutes();

export default routes.router;