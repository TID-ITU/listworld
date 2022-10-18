import './ProductList.css'

const ProductList = () => {
    const cabbageText = 'Cabbage';

    return (
        <ul>
            <li className="first-list-item">{cabbageText}</li>
            <li>Carrots</li>
            <li>Strawberries</li>
            <li>Tide pods</li>
        </ul>
    )
}

export default ProductList;