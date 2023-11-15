const socket = io() // Inicia la conexion

document.querySelector('#btn')?.addEventListener('click', ()=>{

try {
    const title =document.querySelector('#titulo').value
    const description=document.querySelector('#descripcion').value
    const category= document.querySelector('#categoria').value
    const code= document.querySelector('#codigo').value
    const price= document.querySelector('#precio').value
    const stock= document.querySelector('#stock').value
    

    
    if (!title || !description || !category || !code || !price|| !stock) {
        throw new Error('Todos los campos son obligatorios')
    }
    
    const nuevoProducto = {
      title: title,
      description: description,
      category: category,
      code: code,
      price: parseFloat(price),
      stock: parseInt(stock)
      
    }
    
    
        socket.emit('addProduct', nuevoProducto, (res) => {
            if (res.status.status === 'Ok') {
                Swal.fire({
                    title: "Producto agregado!",
                    icon: "success",
                    color: "write"
                  });
                console.log('El producto fue agregado correctamente')
                document.querySelector('#titulo').value = ''
                document.querySelector('#descripcion').value = ''
                document.querySelector('#categoria').value = ''
                document.querySelector('#codigo').value = ''
                document.querySelector('#precio').value = ''
                document.querySelector('#stock').value = ''
            }else {
                console.log('El producto no fue agregado')
            }

        })
    }catch(error){

        console.log('El producto no fue agregado')
        Swal.fire({
            
            icon: "error",
            title: "Oops...",
            text: "El producto no fue agregado!"
          });
    }  
           
})
    


socket.on('update', async ({productos}) => {
    console.log(productos)
    const tabla = document.querySelector('#productsTable')
    tabla.innerHTML = ''
    for(const producto of productos){
      const fila = document.createElement('tr')
      fila.innerHTML = `
          <th scope="row">${producto.id}</th>
          <td>${producto.title}</td>
          <td>${producto.description}</td>
          <td>${producto.category}</td>
          <td>${producto.code}</td>
          <td>${producto.price}</td>
          <td>${producto.stock}</td>
          `
      tabla.appendChild(fila)
    }
  })



