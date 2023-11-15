import express from 'express'
import {PORT,PRODUCTOS_JSON} from './config.js'
import {engine} from 'express-handlebars'
import {Server as IOServer} from 'socket.io'
import {webRouter} from '../routes/webRouter.js'
import { ProductsManager } from './ProductsManager.js'
//import {apiRouter} from '../routes/apiRouter.js'

export const pm= new ProductsManager(PRODUCTOS_JSON)
pm.init()

const app=express()

app.engine('handlebars',engine()) //motor de handlebars
app.set('views', './views')
app.set('view engine', 'handlebars') //motor de vistas

app.use ('/static', express.static('./static'))

app.use('/', webRouter) 


const server= app.listen(PORT,async ()=>{ 
    console.log(`conectado y escuchando en puerto ${PORT}`)
})

const ioServer= new IOServer(server)

ioServer.on('connection', socket => {
    
    console.log('connected client', socket.id)
    socket.emit ('update', {productos: pm.getAll()}) 
    
    socket.on('addProduct', async (producto, callback) => {
        const respuesta = await pm.addProducts(producto)
        callback({status: respuesta}) 
        ioServer.sockets.emit('update', {productos: pm.getAll()})
         
    })

})