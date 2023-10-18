
# Product Manager en JavaScript

  

Este es un ejemplo de un "Product Manager" implementado en JavaScript. La clase `ProductManager` se encarga de gestionar un conjunto de productos, permitiendo agregar nuevos productos, verificar la disponibilidad de campos obligatorios y evitar la repetición de códigos de productos. Además, proporciona la funcionalidad de obtener una lista de productos y buscar productos por su ID.

  

## Características Implementadas

  

En este proyecto, se aplican conceptos y características aprendidos en clases de backend, incluyendo:

  

-  **JavaScript ES6**: El código está escrito utilizando características de ECMAScript 6, como la declaración de variables con `let` y `const`, funciones de flecha, y mucho más.

  

-  **Clases en JavaScript**: La implementación utiliza clases de JavaScript para definir y organizar la funcionalidad del "Product Manager".

  

-  **Uso de Métodos de Arreglos**: Se utilizan métodos de arreglos como `filter`, `find`, y `join` para gestionar los productos y validar campos, este ultimo conocido por investigacion fuera de clase.

  

## Uso del Código

  

Para utilizar el "Product Manager" y ejecutar el código, sigue estos pasos:

  

1. Clona el repositorio a tu máquina local.

2. Asegúrate de tener Node.js instalado en tu sistema.

3. Abre una terminal en la **carpeta del proyecto** y ejecuta el siguiente comando para ejecutar el código:

  

```bash
node ProductManager.js
```

- Puedes agregar productos utilizando el método addProduct, obtener la lista de productos con getProducts, y buscar productos por su ID con getProductById.

  

- Observa cómo se valida la presencia de campos obligatorios y la prevención de códigos duplicados.

  

## Ejemplos de Ejecución

  

El siguiente código muestra cómo se crea una instancia de **ProductManager**, se agregan dos productos, se obtiene la lista de productos y se busca un producto por su ID:

  

```bash

const  productManager  =  new  ProductManager();

  

productManager.addProduct("Pan",  "Pan tajado",  10.99,  "imagen1.jpg",  "P1",  100);

productManager.addProduct("Leche",  "Caja de Leche 3 lts",  15.99,  "imagen2.jpg",  "P2",  50);

  

const  products  =  productManager.getProducts();

console.log(products);

  

const  product  =  productManager.getProductById(1);

console.log(product)
```