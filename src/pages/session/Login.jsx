import React from 'react'
import {useForm} from 'react-hook-form'
//importar funcion para iniciar sesión
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import {auth_user, providerGoogle} from '../../firebase/appConfig'
import Swal from 'sweetalert2'
import { json, Link } from 'react-router-dom'
import "../../App.css"

export default function Login() {
    const {register , handleSubmit, formState: {errors}} = useForm()

    //metodo para iniciar sesion
    const loginForm = (data) =>{
        signInWithEmailAndPassword(auth_user, data.email, data.password).then((userCredentials)=>{
            //USUARIO EXISTE: Extraer su info de user
            const user = userCredentials.user
            //GUARDAR INFO DE USUARIO EN LOCAL STORAGE
            saveLocalStorage("user_firebase",JSON.stringify(user))
        }).catch((error)=>{
            console.error(error.message)
            Swal.fire({
                title: "Error en Login",
                text: "Credenciales inválidas",
                icon: "warning"
              });
        })
    }

    //Metodo iniciar sesion con google
    const loginGoogle = async()=>{
        //Metodo para autenticar con un proveedor externo
        try {
            const result = await signInWithPopup(auth_user, providerGoogle)
            //Almacenar info de usuario de storage
            saveLocalStorage("user_firebase",JSON.stringify(result.user))
        }
        catch(error){
            console.error(error.message)
            Swal.fire({
                title: "Error en el Login",
                text: "Credenciales inválidas",
                icon: "warning"
              });
        }
    }

    //Metodo para guardar usuario en localStorage
    const saveLocalStorage = (key, data) =>{
        //localStorage(setItem, getItem)
        localStorage.setItem(key, data)
    }

  return (
    <div className='d-flex p-5 align-items-center justify-content-center align-items-stretch'>
        
        <img className='img-fluid w-50' src="../public/login.jpg" alt="" />
        
        <div className=' card text-white bg-dark p-5 text-center align-items-center h-4'>
        <h1>Bienvenido!</h1>
        <hr />
        <form action="" onSubmit={handleSubmit(loginForm)}>
            <div>
                <input className='form-control rounded-4 mb-3 w-100' type="email" placeholder='Correo electrónico ...' {...register('email',{required: true})}/>
                {errors.email && <span style={{color :"red"}}>Campo Obligatorio</span>}
            </div>
            <div>
                <input className='form-control rounded-4 mb-3 w-100' type="password" placeholder='Contraseña ...' {...register('password',{required: true})} />
                {errors.password && <span style={{color :"red"}}>Campo Obligatorio</span>}
            </div>
            <button className='btn btn-success w-100 rounded-4' type='submit'> Iniciar Sesión</button>
            <div>
                <hr />
            <button className='btn btn-primary w-100 rounded-4 mb-2' onClick={loginGoogle}>Ingresa con Google</button>
        </div>
        </form>

        <section>
            <p>¿Aún no tienes cuenta? </p>
            <p><Link to="/registrar" className='enlace'>Registrate Aquí!</Link></p>
        </section>
        </div>
        
        
    </div>
  )
}
