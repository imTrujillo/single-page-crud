import React from 'react'
import { Link} from 'react-router-dom'
import Home from '../pages/Home'
import ListProducts from '../../components/ListProducts'
import RegisterProducts from '../../components/RegisterProducts'
import EditForm from '../../components/EditForm'

export default function Menu() {
     /**
     * BrowsertRouter => contenedor principal para navegacion para trabajar con rutas
     * Routes => contenedor que envuelve las rutas
     */
  return (
        <header className='d-md-flex flex-column flex-md-row'>
             <nav className='align-items-center text-center d-md-flex flex-column flex-md-row'>
            <h2 className='my-2'>Administrar inventario</h2>
           
                <ul className='gap-5 align-items-center d-md-flex flex-column flex-md-row enlace'>
                    <li >
                        <Link to="/productos" className='enlace'>Productos</Link>
                    </li>
                    <li >
                        <Link to="/registros" className='enlace'>Registros</Link>
                    </li>
                </ul>
            </nav>
        </header>
    
  )
}
