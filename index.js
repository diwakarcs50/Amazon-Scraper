const express=require('express')
const request=require('request-promise')

const app=express()
const PORT=process.env.port || 5000


// const baseUrl=`https://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl=(apiKey)=>`https://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`


app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<div style="color:blue" text-align:center> Hello from amazom </div>')
})

//get the product by providing the id
app.get('/products/:productId',async (req,res)=>{
    const {productId}=req.params
    const {api_key}=req.query
    try{
       const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
       res.json(JSON.parse(response))
    }
    catch(error){
        console.log(error)
    }
   
})

//get the reviews on product
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId}=req.params
    const {api_key}=req.query
  try{
    
     const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
     res.json(JSON.parse(response))
  }
  catch(error){
    console.log(error)
  }
})

//get the offers on product
app.get('/products/:productId/offers',async(req,res)=>{
    const {productId}=req.params
    const {api_key}=req.query
  try{
    
     const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offers-listing/${productId}`)
     res.json(JSON.parse(response))
  }
  catch(error){
    console.log(error)
  }
})


//search the product
app.get('/search/:searchQuery',async(req,res)=>{
    const {searchQuery}=req.params
    const {api_key}=req.query
  try{
    
     const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
     res.json(JSON.parse(response))
  }
  catch(error){
    console.log(error)
  }
})
app.listen(PORT,()=>{console.log(`server up and running at port ${PORT}`)});