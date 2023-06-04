import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://646870dfe99f0ba0a824be78.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                navigate('/')
                alert('Ошибка при получении пиццы')
            }
        }
        fetchPizza()
    }, [])

    
    if (!pizza) {
        return <div>'загрузка...'</div>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt='foto'/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    )
}

export default FullPizza