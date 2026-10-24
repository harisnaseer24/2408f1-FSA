import express from 'express';
import ProductController from '../controllers/productController.mjs';

const productRouter= express.Router();


productRouter
.get("/", ProductController.showProducts)
.get("/:id", ProductController.showSingleProduct)
.post("/", ProductController.addProduct)
.delete("/:id", ProductController.deleteProduct)
.put("/:id", ProductController.editProduct)
.patch("/:id", ProductController.ChangePrice)


export default productRouter;


