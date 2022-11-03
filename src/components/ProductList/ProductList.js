import './ProductList.css'

const ProductList = () => {
    const productList = [
        "Cabbage",
        "Carrots",
        "Strawberries",
        "Tide pods",
        "Dahl",
        "Cabbage",
        "A Tesla"
    ]

    return (
        <ul>
            {productList.map( (item, index) => <li key={index}>{item}</li> )}
        </ul>
    )
}

export default ProductList;