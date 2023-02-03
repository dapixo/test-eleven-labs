import { Router } from "express";
import { CosmonautType } from "~~/model/ cosmonaut";
import { CosmonautService } from "./cosmonaut.service";

const CosmonautController = Router();
const service = new CosmonautService();

CosmonautController.get("/", (req, res) => {
  return res.status(200).json(service.findAll());
});

CosmonautController.get("/:id", (req, res) => {
  const id =
    typeof req.params.id === "string" ? Number(req.params.id) : req.params.id;
  const cosmonaut = service.findOne(id);
  return res.status(200).json(cosmonaut);
});

CosmonautController.post("/", (req, res) => {
  const createdCosmaunaut: Partial<CosmonautType> = service.create(req.body);
  return res.status(201).json(createdCosmaunaut);
});

CosmonautController.patch("/:id", (req, res) => {
  const id =
    typeof req.params.id === "string" ? Number(req.params.id) : req.params.id;
  const updatedCosmonaut = service.update(req.body, id);
  return res.status(200).json(updatedCosmonaut);
});

CosmonautController.delete("/:id", (req, res) => {
  const id =
    typeof req.params.id === "string" ? Number(req.params.id) : req.params.id;
  return res.status(200).json(service.delete(id));
});

export { CosmonautController };
