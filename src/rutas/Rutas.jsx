import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Register from '../pages/session/Register'
import Home from '../pages/Home'
import ListProducts from '../../components/ListProducts'
import RegisterProducts from '../../components/RegisterProducts'
import EditForm from '../../components/EditForm'
import Menu from './Menu'

/**
 * 
 * @returns 3 rutas: home, login, registro
 */

export default function Rutas() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/registrar' element={<Register/>}></Route>
        <Route path='/productos' element={<ListProducts/>}/>
        <Route path='/registros' element={<RegisterProducts/>}/>
        {/**Crear ruta con parametros */}
        <Route path='/editar/:id' element={<EditForm/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
