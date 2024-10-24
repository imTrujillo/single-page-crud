import React from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {auth_user} from '../../firebase/appConfig'
import Swal from 'sweetalert2'

import registerImage from '../../../public/register.jpg';

//crear un esquema (reglas) para validar password
const schema = yup.object().shape({
    //ASIGNAR REGLAS A VALIDAR
    email: yup.string().required("El correo es obligatorio").email("Correo invalido, ejemplo: usuario@dominio.com"),
    password: yup.string().required("Campo obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null],"Las contraseñas no son iguales")
})

export default function Register() {
    const {register, handleSubmit, formState: {errors}}= useForm({
        resolver: yupResolver(schema)
    })

//CONSTANTE PARA LA NAVEGACIÓN
const navigate = useNavigate();

//CREAR UN USUARIO PARA FIREBASE
const registerForm = (data) =>{
    createUserWithEmailAndPassword(auth_user, data.email, data.password).then((userCredential)=>{
        const user = userCredential.user;
        //REDIGIRIR A PAGINA PRINCIPAL
        navigate("/")
    }).catch((error) => {
        Swal.fire({
            title: "Error en el registro",
            text: "Ocurrio un problema",
            icon: "warning"
          })
    })
}

  return (
    <div className='d-md-flex p-5 align-items-center justify-content-center align-items-stretch flex-md-row text-center' >
        
        <img className='w-50' src={registerImage} alt="Register" />
        
        <div className='d-flex p-5 align-items-center justify-content-center flex-column login-height card text-white bg-dark text-center align-items-center'>
        <h1>Registrar Usuario</h1>
        <form className='w-100' onSubmit={handleSubmit(registerForm)}>
            <div>
            <span style={{color: "red"}}>{errors.email && errors.message}</span>
                <input className='form-control rounded-4 mb-3 mt-3 w-100' type="email" placeholder='Ingrese su correo electrónico' {...register('email',{required: true})} />
                
                
            </div>
            <div>
            <span style={{color: "red"}}>{errors.password && errors.password.message}</span>
                <input className='form-control rounded-4 mb-3 w-100' type="password" placeholder='Ingrese su contraseña' {...register('password',{required: true})} />
                
            </div>
            <div>
            <span style={{color: "red"}}>{errors.confirmPassword && errors.confirmPassword.message}</span>
                <input className='form-control rounded-4 mb-3 w-100' type="password" placeholder='Confirme la contraseña' {...register('confirmPassword')}/>
                
            </div>
            <button className='btn btn-success w-100 rounded-4' type='submit'> Registrarse</button>
        </form>
        </div>
        
    </div>
  )
}
