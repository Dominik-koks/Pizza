import React, { useCallback, useEffect, } from 'react';
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../Redux/Slices/FilterSlice'
import { useSelector } from 'react-redux';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { fetchPizzas, selectPizza } from '../Redux/Slices/PizzasSlice';
import { useAppDispatch } from '../Redux/Store';


const Home: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const { items, status } = useSelector(selectPizza)
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)


    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);


    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }


    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
        }))

        window.scrollTo(0, 0)
    }


    //Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage,])


// type Params = {
//     searchValue: string
//   categoryId: number
//   currentPage: number
//   sortProperty: "price" | "rating" | "title" | "-rating" | "-price" | "-title"
// }

    //Если был первый рендер то проверяем URL-параметры и сохраняем их в редаксе
    useEffect(() => {
        if (window.location.search) {
            // const params = (qs.parse(window.location.search.substring(1)) as unknown) as Params
            const params: any = qs.parse(window.location.search.substring(1)) 
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
console.log(params)
            dispatch(setFilters({
                ...params,
                sort
            }),
            )
            isSearch.current = true
        }
    }, [])


    //Если был первый рендер то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)

        // if (!isSearch.current) {
        getPizzas()
        // }
        isSearch.current = false

    }, [categoryId, sort.sortProperty, searchValue, currentPage,])


    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((obj, index) => <Skeleton key={index} {...obj} />)



    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onClickCategory={onChangeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {status === 'error' ? (
                    <div className='content__error-info'>
                        <h2>Произошла ишибка 😕</h2>
                        <p>
                            К сожалению, не удалось получить пиццы.
                            Попробуйте повторить попытку позже.
                        </p>
                    </div>
                ) : (<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>)}
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </>
    )
}

export default Home