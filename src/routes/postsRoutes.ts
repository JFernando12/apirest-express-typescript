import { Router, Request, Response } from "express";
import Post from "../models/Post";

class PostsRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getPosts(req: Request, res: Response) {
        const posts = await Post.find();
        console.log(posts);
        res.json(posts)
    }

    async getPost(req: Request, res: Response) {
        const url = req.params.url;
        const post = await Post.findOne({ url })
        res.json(post);
    }

    async createPost(req: Request, res: Response) {
        const data = req.body;
        const newPost = new Post(data);
        await newPost.save();
        res.json(newPost);
    }

    async updatePost(req: Request, res: Response) {
        const url = req.params.url;
        const data = req.body;
        const post = await Post.findOneAndUpdate({ url }, data, { new: true });
        res.json(post);
    }

    async deletePost(req: Request, res: Response) {
        const url = req.params.url;
        await Post.deleteOne({ url });
        res.json(`Post ${url} deleted succesfully`);
    }

    routes() {
        this.router.get("/", this.getPosts);
        this.router.get("/:url", this.getPost);
        this.router.post("/", this.createPost);
        this.router.put("/:url", this.updatePost);
        this.router.delete("/:url", this.deletePost);
    }

}

const postsRoutes = new PostsRoutes();

export default postsRoutes.router;