import React, { useState } from 'react'
import sneakerImg from '../../../assets/images/sneakercate.jpg'
import streetwearImg from '../../../assets/images/streetwearcate.jpg'
import { useLocation } from 'react-router'

//components
import Chat from '../../../components/Chat'
import Navbar from '../../../components/Navbar'
import Filter from '../../../components/Filter'
import ProductContainer from '../components/ProductContainer'
import Footer from '../../../components/Footer'

const contents = {
    streetwear: "Supreme, OFF-WHITE, Fear of God, Travis Scott, BAPE, & more. Buy & sell streetwear right here on StockX.",
    sneakers: "On Authenticity, every sneaker you want is always available and authentic. Buy and sell new sneakers & shoes from Air Jordan, adidas, Nike, Yeezy and more!"
}

const CategoryPage = () => {
    const queryParams = useLocation().search
    const brand = new URLSearchParams(queryParams).get('brand')
    const category = new URLSearchParams(queryParams).get('category')
   
    const keyword = new URLSearchParams(queryParams).get('s')
    const [filters, setFilters] = useState({
        page: 1,
        brand: brand, 
        category: category,
        s: keyword,
    })
    const handleFiltersChange = (fil) => {
        if (fil.page === filters.page) {
            setFilters({
                ...fil,
                page: fil.selected - fil.selected + 1
            })
        } else {
            setFilters({
                ...fil
            })
        }
       
    }
 
    return (
        <div>
            <Navbar home={false}/>
            {
                !filters.category || filters.category === 'streetwear' ?
                <div style={{backgroundImage: `url(${streetwearImg})`}} className="min-h-[280px] mt-14 px-12 mx-auto pt-20 pb-12 bg-cover bg-center">
                    <h1 className="text-5xl font-semibold mb-6">Streetwear</h1>
                    <p className="max-w-md">{contents.streetwear}</p>
                </div>
                 :
                <div style={{backgroundImage: `url(${sneakerImg})`}} className="min-h-[280px] mt-14 px-12 mx-auto pt-20 pb-12">
                    <h1 className="text-5xl font-semibold mb-6">Sneakers</h1>
                    <p className="max-w-md">{contents.sneakers}</p>
                </div>
                
            }
            <div className="ml-[235px] mt-[30px]">
           
            </div>
            <div className="max-w-[1200px] mx-auto mt-7 grid grid-cols-12 ">
                <Filter  filters={filters} onFiltersChange={handleFiltersChange}/>
                <ProductContainer filters={filters} onFiltersChange={handleFiltersChange}/>
            </div>
            <Chat />
            <Footer />
        </div>
    )
}

export default CategoryPage
