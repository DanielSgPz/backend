import express from 'express'
import {ProductManager} from './ProductManager.js'
import {PORT,PRODUCTOS_JSON} from './config.js'

const pm = new ProductManager(PRODUCTOS_JSON)
const app = express()
app.use(express.json());

app.get('/products',async (req, res)=>{
    try{
        const limit=parseInt(String(req.query.limit));
        const products= await pm.getProducts();

        if (!isNaN(limit) && limit > 0) {
            res.json(products.slice(0, limit));
          } else {
            res.json(products);
          }
        
    }catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
}) 

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid); 
  
    if (!isNaN(productId)) {
      const product = pm.getProductById(productId);
  
      if (product) {
        res.json(product);
      } else {
        res.json({
          status: 'error',
          message: 'No se encontró ningún producto con el ID proporcionado.',
        });
      }
    } else {
      res.json({
        status: 'error',
        message: 'ID de producto no válido. Debe ser un número entero.',
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });