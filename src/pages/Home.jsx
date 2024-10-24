import React, { useState } from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import Login from './session/Login'
import Menu from '../rutas/Menu'
import { signOut } from 'firebase/auth'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Register from './session/Register'
import { auth_user } from '../firebase/appConfig'

export default function Home() {
    //estado donde verificamos si el usuario esta autenticado
    const [user, setUser] = useState(null)

    //ACCEDER AL USUARIO DEL LOCALSTORAGE
    const userStorage = JSON.parse(localStorage.getItem("user_firebase"))

    //verificar si el usuario esta en firebase
    onAuthStateChanged(auth_user, (userFirebase) => {
        if (userFirebase){//userFirebase devuelve objeto si la persona existe
            //si usuario existe, actualizar estado
            setUser(userFirebase)
        }
        else{
            setUser(null)
        }
    })

    //METODO PARA CERRAR SESION
    const logout = () =>{
        signOut(auth_user).then(()=>{
            Swal.fire({
                title: "Sesión Cerrada",
                text: "Has cerrado sesión",
                icon: "success"
              });
        }).catch((error)=>{
            console.error("Error al cerrar sesión")
        })
    }

  return (
    <div>{
        //USUARIO EXISTE: dar bienvenida. NO EXISTE: loguearse
        user ? 
        <>
        <div className='text-center'>
        <nav className="navbar w-100 navbar-expand text-white bg-dark justify-content-between px-5 py-3 d-md-flex flex-column flex-md-row">
            <div className="d-flex gap-4">
                <img className='logo img-fluid' src="https://protoinfrastack-myfirstbucketb8884501-fnnzvxt2ee5v.s3.amazonaws.com/cuyl3c8Oq9bP2BrE0xv5ylOc5TbUtrPwPoGJ.png"  />
                <h1>Digital Store</h1>
            </div>
        
        <Menu />
        </nav>
        <div className=' p-5 gap-5 d-md-flex flex-column flex-md-row'>
            <div>
            <h3 className='body text-white'>Bienvenido ¿Qué tal tu día?</h3>
            <img className='rounded-4 my-3' src={userStorage.photoURL ? userStorage.photoURL : "https://cdn-icons-png.flaticon.com/512/4123/4123763.png"} alt=""  style={{width:"150px"}}/>
            </div>
        <div className='cardcard text-white bg-secondary mb-3 p-4 rounded-4'>
        <p>Usuario: {userStorage.displayName ? userStorage.displayName : "Invitado"}</p>
        <p>Correo: {userStorage.email}</p>
        <button className='btn btn-danger p-3 rounded-5' onClick={logout}>Cerrar Sesión</button>
        </div>
        
        </div>
        </div>
        </>
        : <Login /> }
        
    </div>
  )
}
