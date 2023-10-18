class ProductManager {
    static productIdCounter = 1; // Agrego el tributo de clase (diferente del objeto producto)

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Valido los campos obligatorios
        const inputs = [title, description, price, thumbnail, code, stock];
        const inputsRelated = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

        const missingInputs = inputsRelated.filter((fieldName, index) => !inputs[index]);

        if (missingInputs.length > 0) {
            console.log("Los siguientes campos son obligatorios y están vacíos: " + missingInputs.join(', '));
            return;
        }

        // Valido que el producto no esté repetido
        for (const product of this.products) {
            if (product.code === code) {
                console.log("Ya existe un producto registrado con ese codigo.");
                return;
            }
        }

        // Id autoincrementable después de agregar un producto para que el siguiente tome el valor incrementado
        const product = {
            id: ProductManager.productIdCounter, // Acceso al atributo de la clase
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        ProductManager.productIdCounter++; // Incremento del atributo de la clase
        console.log("Producto agregado.");
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
}


const productManager = new ProductManager();

productManager.addProduct("Pan", "Pan tajado", 10.99, "imagen1.jpg", "P1", 100);
productManager.addProduct("Leche", "Caja de Leche 3 lts", 15.99, "imagen2.jpg", "P2", 50);

const products = productManager.getProducts();
console.log(products);

const product = productManager.getProductById(1);
console.log(product);
