import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import {useForm} from 'react-hook-form'
import {db} from '../src/firebase/appConfig'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function RegisterProducts() {
  const {register, handleSubmit, watch, formState: {errors}} = useForm()

  {
    /**register: haces referencia a captura de datos
     * handleSubmit, es la accion sobre que hare con mi info
     */
  }

  //CREAR CONSTANTE para redirigir a una ruta
  const navigate = useNavigate();

  const saveProduct = async(data) =>{
    //Conectarse a DB, GUARDAR DOC
    try{
      await addDoc(collection(db, "products"),{
    name: data.name,
    description: data.description}
  )
  console.log("LISTO")
    //REDIRECCIONAR A LISTA DE PRODUCTOS
    navigate("/productos")
  
    }catch(error){
      console.error("Hay un error", error)
    }
    
  }

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <navbar className="navbar w-100 navbar-expand text-white bg-dark justify-content-between px-5 py-3">
        <div className='d-flex gap-4' >
        <img src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-back-arrow-backward-direction-previous-png-image_5198415.png" style={{width: "20px"}} alt="" />
        <Link to="/" className='enlace'>Regresar</Link>
        </div>
        <h2>Registro de Productos</h2>
      </navbar>
      
      
      <form className='login-height card text-white bg-dark p-5 text-center flex-column align-items-center h-4 w-50 m-5 justify-content-center' action="" onSubmit={handleSubmit(saveProduct)}>
          <input className='form-control rounded-4 mb-3 w-100' placeholder='Ingresar Producto:' type="text" {...register('name')} />
          <input className='form-control rounded-4 mb-3 w-100' placeholder='Ingresar Descripción:' type="text" {...register('description')} />
          <button className='btn btn-success w-100 rounded-4' type='submit'>Guardar Producto</button>
      </form>
    </div>
  )
}
