import React, { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../Redux/Slices/FilterSlice'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Home() {
    const categoryId = useSelector(state => state.filter.categoryId)
    const sortType = useSelector(state => state.filter.sort.sort)
    const currentPage = useSelector(state => state.filter.currentPage)
    const dispatch = useDispatch()




    const { searchValue } = useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)




    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((obj, index) => <Skeleton key={index} {...obj} />)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        setIsLoading(true)
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''
        axios(`https://646870dfe99f0ba0a824be78.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`)
            .then(resp => {
                setItems(resp.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onClickCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {
                        isLoading ? skeletons : pizzas
                    }
                </div>
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </>
    )
}

export default Home