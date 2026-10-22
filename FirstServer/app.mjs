import express from 'express';// commonjs
import fs from "node:fs"
const app = express()
const port = 3000

// const products = [
//   {id:1,title:"a",price:"343"},
//   {id:2,title:"a",price:"343"},
//   {id:3,title:"a",price:"343"},
//   {id:4,title:"a",price:"343"},
//   {id:5,title:"a",price:"343"},
//   {id:6,title:"a",price:"343"},
//   {id:7,title:"a",price:"343"}
// ]


const products = JSON.parse(fs.readFileSync("data.json","utf-8")).products
// console.log(products)
//endpoints

//req (there are 3 ways data can be passed through req)
// req.params
// query.params
// req.body

//body parser
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('About!')
})

app.get('/contact', (req, res) => {
  res.json({msg:"Good to hear from you!"})
})



app.get('/products', (req, res) => {
  res.status(200).json({products:products})
})


// product/7534242343

//req.params (compulsory)
app.get('/product/:id', (req, res) => {
 try {
  const id = req.params.id  //75
  const product= products.find((item)=>{
   return item.id == id

  })
  if (product != null) {
    
    res.status(200).json({msg:"Product found",product:product})
  } else {
    res.status(200).json({msg:"Product not found invalid id"})
    
  }

 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
  
 }
})


//query parameter (optional)
app.get('/profile', (req, res) => {

 try {

  const color = req.query.color  //75
 
  if (color != null) {
    
    res.status(200).json({msg:`Theme is set to your desired ${color} color`})
  } else {
    res.status(200).json({msg:"Default light theme is applied"})
    
  }

  
 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
  
 }
})



//post api (req.body)
app.post('/addproduct', (req, res) => {

 try {
  // console.log(req.body.id)

  const data = req.body 
  products.push(data)
 
    res.status(200).json({msg:`Product added succesfully`})
  

  
 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
  
 }
})









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})