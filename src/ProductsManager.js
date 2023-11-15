import fs from 'fs/promises'
import {Product} from './Product.js'


export class ProductsManager{

    static id = Math.random().toString(36).substring(7)

    constructor(ruta){
        this.ruta=ruta
        this.products=[]

    }

    
    async init() {
        try {
            const fileContent = await this.#readProducts()
            if (!fileContent || fileContent.length === 0) { throw new Error('Creando archivo') } 
            fileContent.forEach(el => { this.Products.push(el) }) 
            ProductsManager.id = fileContent[fileContent.length - 1].id 
            console.log('Archivo leido') 
        } catch (err) {
            console.log(err.message) 
        }
    }


    async #readProducts(){
        const productsEnJson = await fs.readFile(this.ruta,'utf-8')
        this.products = JSON.parse(productsEnJson)
    }

    async #writeProducts(){
        await fs.writeFile(this.ruta, JSON.stringify(this.products, null, 2))
    }

    getAll(){
        return this.products
    }
        

    async addProducts(prod){
    
        try {
            const product= new Product(prod)
            await this.#readProducts()
            this.products.push(product)
            await this.#writeProducts()
            console.log(this.products)
            return {status: 'Ok', message: product}
        } catch (err) {
            return { status: 'Error al agregar el producto', message: err.message }
        }
    }  

}

