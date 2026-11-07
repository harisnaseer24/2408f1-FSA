import express from 'express';
import ProductController from '../controllers/productController.mjs';
import adminAuth from '../controllers/middlewares/adminAuth.mjs';
import auth from '../controllers/middlewares/auth.mjs';
import { upload } from '../cloudinaryConfig.mjs';

const productRouter= express.Router();


productRouter
.get("/",adminAuth, ProductController.showProducts)
.get("/:id", ProductController.showSingleProduct)
.post("/", adminAuth,ProductController.addProduct)
.post("/addproductwithimage",upload.single("image") ,ProductController.addProductWithImage)
.delete("/:id", ProductController.deleteProduct)
.put("/:id", ProductController.editProduct)
.patch("/:id", ProductController.ChangePrice)


export default productRouter;


