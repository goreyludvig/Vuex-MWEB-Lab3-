import express from "express";
import daiControler from "./controler";

const daiRouter = new express.Router();

daiRouter.get("/", daiControler.get);
daiRouter.get("/:id", daiControler.getById);
daiRouter.post("/", daiControler.post);
daiRouter.delete("/:id", daiControler.delete);
daiRouter.patch("/:id", daiControler.patch);

export default daiRouter;