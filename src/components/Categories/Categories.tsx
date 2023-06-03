import React from "react"


type CategoriesProps = {
    value: number
    onClickCategory: (i: number) => void
}


const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {


    const Category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']



    return (
        <div className="categories">
            <ul>
                {Category.map((li, index) => <li key={`${li} ${index}`} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>{li}</li>)}
            </ul>
        </div>
    )
}

export default Categories