import React from 'react'
import s from './NotFoundBlock.module.scss'

function NotFoundBlock() {
    return (
        <div className={s.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p>К сожалению данная страница отсутствует в нашем магазине</p>
        </div>

    )
}

export default NotFoundBlock