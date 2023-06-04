import React from 'react'
import s from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'


type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void ;
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination