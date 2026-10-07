import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { useEffect, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.css'
import { useAppStore } from '../stores/useAppStore'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''

    })
    const { pathname } = useLocation()

    const isHome = useMemo(()=> pathname === '/', [pathname]) 
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    useEffect(()=> {fetchCategories()}, [])
    const categories = useAppStore(state => state.categories)
    const searchRecipes = useAppStore(state => state.searchRecipes)

    const handleChange = (e : ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e : SubmitEvent<HTMLFormElement>) => {    
        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            console.log('Todos los campos son obligatorios')
            return
        }

        searchRecipes(searchFilters)
        //Consultar 
    }
    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className='mx-auto container px-5 py-16'>
                <div className='flex justify-between items-center'>
                    <div>
                        <img className='w-32' src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className='flex gap-4'>
                        <NavLink
                            to="/" className= {({isActive}) => isActive ? 'text-orage-500 uppercase font-bold'  : 'text-white uppercase font-bold'}>
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/favoritos"
                            className= {({isActive}) => isActive ? 'text-orage-500 uppercase font-bold'  : 'text-white uppercase font-bold'}>
                            Favoritos
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form action="" className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg
                    shadow space-y-6'
                    onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="ingredient"
                            className='block text-white uppercase font-extrabold text-lg'
                            >
                                Nombre o Ingredientes
                            </label>
                            <input id='ingredient' type="text" name='ingredient' className='p-3 w-full rounded-lg focus:outline-none'
                            placeholder='Nombre o Ingredientes. Ej. Vodka, Tequila, Café'
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                            />
                        </div>
                         <div>
                            <label htmlFor="category"
                            className='block text-white uppercase font-extrabold text-lg'
                            >
                                Categoria 
                            </label>
                            <select id='category' name='category' className='p-3 w-full rounded-lg focus:outline-none'
                            onChange={handleChange}
                            value={searchFilters.category}>
                                <option value="">-- Seleccione ---</option>
                                
                               { categories.drinks.map((drink) => 
                                    <option key={drink.strCategory} value={drink.strCategory}>{drink.strCategory}</option>
                               )}
                            </select>
                            <input type="submit" value="Buscar Recetas" className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full '/>
                        </div>
                    </form>
                )}
            </div>

        </header>
    )
}
