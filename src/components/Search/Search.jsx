import React, { useContext, useRef, useState } from 'react'
import s from './Search.module.scss'
import close from '../../assets/img/close.svg'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'


function Search() {
    const [value, setValue] = useState('')
    const { setSearchValue } = useContext(SearchContext)
    const inputRef = useRef()


    const uppDateSearchValue = useRef(
        debounce((str) => {
            setSearchValue(str)
        }, 500)).current;

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const onChangeInput = (event) => {
        setValue(event.target.value)
        uppDateSearchValue(event.target.value)
    }

    return (
        <div className={s.root}>
            <svg className={s.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" /></g></svg>
            <input ref={inputRef} value={value} onChange={onChangeInput} className={s.input} placeholder='Поиск пиццы...'></input>
            {value && <img onClick={onClickClear} className={s.close} src={close} alt="close" />}
        </div>
    )
}

export default Search