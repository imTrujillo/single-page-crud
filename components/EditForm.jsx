import { getDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {db} from '../src/firebase/appConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function EditForm() {
    const {register, handleSubmit, formState: {errors}} = useForm()

    //useParams captura parametros que mandamos en ruta
    const{id} = useParams()

    const navigate = useNavigate()

    //Montar producto seleccionado
    useEffect(() => {

        const getProductsById= async() =>{
            const productDoc = await getDoc(doc(db, "products",id))
        if (productDoc.exists()){
            const productData = productDoc.data()

            //mandar info de prod a formulario
            setValue('name',productData.name)
            setValue('description',productData.description)
        }
        }

        getProductsById()
    }, [])

    const editProduct = async(data) =>{
        try{
          if(data.name !== "" && data.description !== ""){
            //Actualizar el producto, seleccionamos el doc por id
            updateDoc(doc(db, "products", id),{
                name: data.name,
                description: data.description
            })
            //Redireccionar a lista de productos
            navigate("/productos")}
            else{
              Swal.fire({
                title: "Error en el registro",
                text: "No puedes dejar campos vacíos",
                icon: "warning"
              })
            }
        }catch(error){
            console.error("Error al actualizar producto", error)
        }
    }

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <navbar className="navbar w-100 navbar-expand text-white bg-dark justify-content-between px-5 py-3">
      <div className='d-flex gap-4' >
        <img src="https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-back-arrow-backward-direction-previous-png-image_5198415.png" style={{width: "20px"}} alt="" />
        <Link to="/" className='enlace'>Regresar</Link>
        </div>
      <h2>Editar Producto</h2>
      </navbar>
      
      <form className='login-height card text-white bg-dark p-5 text-center flex-column align-items-center h-4 w-50 m-5 justify-content-center' action="" onSubmit={handleSubmit(editProduct)}>
          <input type="text" className='form-control rounded-4 mb-3 w-100' placeholder='Nombre de producto:' {...register('name')} />
          <input type="text" className='form-control rounded-4 mb-3 w-100' placeholder='Descripción del producto:' {...register('description')} />
          <button type='submit' className='btn btn-success w-100 rounded-4'>Guardar Producto</button>
      </form>
    </div>
  )
}