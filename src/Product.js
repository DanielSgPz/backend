import { ProductsManager } from "./ProductsManager.js"

export class Product{

    constructor({title, description, category, code, price, stock }) {
        this.id =ProductsManager.id
        this.title = title
        this.description = description
        this.category = category
        this.code = code
        this.price = price
        this.stock = stock 
    }
    
}