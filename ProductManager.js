const { promises: fs } = require('fs');

const path = 'ruta.json';


class ProductManager {

    constructor(path) {
        this.path = path;
        this.products = [];
        this.#loadProducts();
    }

    async #loadProducts() {
        try {
            const productsSaved = await fs.readFile(this.path, 'utf-8');
            this.parsedProducts  = JSON.parse(productsSaved);
            this.products = [...this.products, ...this.parsedProducts];
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Si el archivo no existe, se crea uno vacío
                // await fs.writeFile(this.path, '[]');
            } else {
                console.log("No se pudo cargar los productos:", error.message);
            }
        }
    }

    async #saveProducts() {
        try {
            const productsToSave = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path,productsToSave );
        } catch (error) {
            console.log("No se pudo guardar los productos:", error.message);
        }
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
        // Valido los campos obligatorios
        if (!(title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === "")) {

            // Valido que el producto no esté repetido
            const existingProduct = this.products.find((product) => product.code === code);
            if (existingProduct) {
                console.log("El producto ya existe.");
            } else {
                const newId = this.generateId();
                const product = {
                    id: newId,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                };
                this.products.push(product);
                //agregar el producto al archivo
                this.#saveProducts();
                console.log("Producto agregado.");
            }

        } else {
            console.log("Faltan campos por llenar");
        }

    }

    async updateProduct(product_id, updatedProduct) {
        const index = this.products.findIndex((p) => p.id === product_id);
        if (index !== -1) {
            this.products[index] = { id: product_id, ...updatedProduct };
            this.#saveProducts();
            console.log("Producto actualizado.");
        } else {
            console.log("No se encontró ningún producto con el ID:", product_id);
        }
    }

       
    async deleteProduct(product_id) {
        await this.#loadProducts();

        const index = this.products.findIndex((p) => p.id === product_id);
        console.log("index", index);
        if (index !== -1) {
            const productDelete = this.products.splice(index, 1);
            const newproducts = this.products;

            this.#saveProducts();
            console.log("Producto eliminado.");
        } else {
            console.log("No se encontró ningún producto con el ID:", product_id);
        }
    }

    getProducts() {

        return this.products;
    }

    getProductById(product_id) {

        const product = this.products.find((p) => p.id === product_id);
        if (product) {
            return product;
        } else {
            console.log("No existe ningún producto con id: ", product_id);
        }
    }

    generateId() {
        // Encontrar el ultimo id y agregar 1
        if (this.products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.products.map((product) => product.id));
        return maxId + 1;

    }
}


const productManager = new ProductManager('productos.json');

console.log(" Agregar productos");
productManager.addProduct('Pan de Avena', 'Delicioso pan de avena recién horneado.', 3.99, 'pan-avena.jpg', 'PAN123', 30);
productManager.addProduct('Rosquillas de Canela', 'Rosquillas esponjosas con un toque de canela.', 2.49, 'rosquillas-canela.jpg', 'ROS456', 20);
productManager.addProduct('Croissants de Mantequilla', 'Croissants de mantequilla crujientes y dorados.', 4.99, 'croissants-mantequilla.jpg', 'CRO789', 15);
productManager.addProduct('Pan Multigrano', 'Pan saludable con semillas de lino y chía.', 3.49, 'pan-multigrano.jpg', 'PAN567', 25);
productManager.addProduct('Pastel de Manzana', 'Pastel de manzana casero con relleno de canela.', 6.99, 'pastel-manzana.jpg', 'PAS890', 10);

console.log(" Actualizar el producto Pan de Avena");
const updatedProductInfo = {
    title: 'Pan de Avena Mejorado',
    description: 'Pan de avena recién horneado con ingredientes naturales.',
    price: 4.49,
    thumbnail: 'pan-avena-mejorado.jpg',
    code: 'PAN123',
    stock: 35
};

productManager.updateProduct(1, updatedProductInfo); 

console.log("Productos",productManager.getProducts());

console.log(" Eliminar el producto Rosquillas de Canela");
const productIdToDelete = 2; 

productManager.deleteProduct(productIdToDelete)