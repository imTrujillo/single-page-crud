import React,{useEffect, useState} from 'react'
import {onSnapshot, collection, deleteDoc, doc} from 'firebase/firestore'
import {db} from '../src/firebase/appConfig'
import { Link} from 'react-router-dom'
import Swal from 'sweetalert2'


export default function ListProducts() {
  //DECLARAR ESTADO PARA LISTA DE PRODUCTOS
  const [products, setProducts] = useState([])

  //importar info de productos de firebase
  useEffect (()=>{
    
    //VER INFO DB EN TIEMPO REAL
    onSnapshot(
      //CONEXIÖN DB y NOMBRE DE COLECCIÓN
      collection(db, "products"), //base de datos, nombre de db
       (snapshot)=>{
        //OBJETO DE FIREBASE
        //TODOS LOS NOMBRES DE COLECCIÓN SON ARREGLOS
        if(!snapshot.empty){
        //TESTEAR PRIMER DOCUMENTO DE SELECCIÓN
        console.log(snapshot.docs[0].data())
        //ITERAR DOCS DE LA COLECCIÓN
        const array_products = snapshot.docs.map((doc) => {
          //COPIAR DATA DE CADA DOC DE LA COLECCIÓN PRODUCTOS Y SE MANDA AL ARRAY PRODUCTS
          return{...doc.data(), id: doc.id}
        })
        
        //ACTUALIZAR ESTADO CON ARREGLO DE RPODUCTOS
        setProducts(array_products)
      }else{
        setProducts([])
      }
      }
    )
    
  }, [])

  //funcion para eliminar un producto
  const deleteProduct = (id) => {
  try{
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás deshacer el cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Ya borralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        //eliminar el doc
        deleteDoc(doc(db, "products",id))
        Swal.fire({
          title: "¡Está borrado!",
          text: "El registro se eliminó.",
          icon: "success"
        });
      }
    });
  }
  catch(error){
    Swal.fire({
      title: 'Error Inesperado',
      text: 'Ocurrio un problema con la solicitud',
      type: 'warning',
      confirmButtonText: 'Ok, Entiendo',
    })
  }
}
  return (
    <div className='d-flex align-items-center justify-content-center flex-column '>
      <navbar className="navbar w-100 navbar-expand text-white bg-dark justify-content-between px-5 py-3">
        <div className='d-flex gap-3'>
        <img src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-back-arrow-backward-direction-previous-png-image_5198415.png" style={{width: "20px"}} alt="" />
        <Link to="/" className='enlace'>Regresar</Link>
        </div>
      <h2>Lista de Productos</h2>
      </navbar>
      
      <div className='align-items-center h-100 d-flex flex-wrap justify-content-center'>
        {
        products.length > 0 ?
          products.map((product) =>{
            return(
              <div className='card text-white bg-secondary p-5 text-center align-items-center h-4 m-3 w-25' key={product.id} >
                <div>
                <h3 className='text-dark'>{product.name}</h3>
                <p>{product.description}</p>
                <Link to={`/editar/${product.id} `} className='enlace'>Editar</Link>
                <button className='m-3 btn btn-danger rounded-3' onClick={() => deleteProduct(product.id)}>Eliminar</button>
                </div>
                
              </div>
              )
          })
          : <div className='d-flex flex-column text-center'><p>Los productos aparecerán aquí</p>
          <img src="https://th.bing.com/th/id/R.41b7d990221881d4f3b5d7811507a8f7?rik=E682KU0MgXW6MA&pid=ImgRaw&r=0" alt="" /></div> 
        }
      </div>
    </div>
  )

}
