
import Product from "../models/productModel.mjs";
// 
const showProducts= async (req, res) => {
 try {
const products = await Product.find()

  res.status(200).json({products:products})
}
catch(error){
  console.log(error.msg)
  res.status(500).json({error:error})

}

}







const addProduct=async (req, res) => {
 try {
  const data = req.body 
const newProduct= new Product({
  title: req.body.title,
  description: req.body.description,
  price: req.body.price,
  stock: req.body.stock,
  rating: req.body.rating,
  brand: req.body.brand,
  category: req.body.title,
  discount: req.body.discount,
  images: req.body.images
})
 const addproduct= await newProduct.save();
 if (addproduct) {
 res.status(200).json({msg:`Product added succesfully`,product:addproduct})
  } else {
   res.status(200).json({msg:`Failed to add product right now`})
 }} catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
 }  
}


const showSingleProduct=async(req, res) => {
 try {
  const id = req.params.id  //75
  const product =await  Product.findById(id)
  if (product != null) {
    
    res.status(200).json({msg:"Product found",product:product})
  } else {
    res.status(200).json({msg:"Product not found invalid id"})
    
  }

 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
  
 }
}

//delete 

const deleteProduct=async(req, res) => {
 try {
  const id = req.params.id  //75
  const delProduct =await  Product.deleteOne({_id:id})
  if (delProduct) {
    
    res.status(200).json({msg:"Product deleted successfully",product:delProduct})
  } else {
    res.status(200).json({msg:"Failed to delete product right now"})
  }

 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
  
 }
}


//update product
const editProduct=async (req, res) => {
 try {
const id = req.params.id
const updateProduct = await Product.updateOne({_id:id},{

  title: req.body.title,
  description: req.body.description,
  price: req.body.price,
  stock: req.body.stock,
  rating: req.body.rating,
  brand: req.body.brand,
  category: req.body.category,
  discount: req.body.discount,
  images: req.body.images

})

 if (updateProduct) {
 res.status(200).json({msg:`Product updated succesfully`,product:updateProduct})
  } else {
   res.status(200).json({msg:`Failed to update product right now`})
 }} catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
 }  
}

//update product
const ChangePrice=async (req, res) => {
 try {
const id = req.params.id
const updateProduct = await Product.updateOne({_id:id},{
  price: req.body.price
})

 if (updateProduct) {
 res.status(200).json({msg:`Product updated succesfully`,product:updateProduct})
  } else {
   res.status(200).json({msg:`Failed to update product right now`})
 }} catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
 }  
}

const ProductController ={
    showProducts,
    showSingleProduct,
    addProduct,
    deleteProduct,
    editProduct,
    ChangePrice
}

export default ProductController;