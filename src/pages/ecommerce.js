import {Card} from "../common/card";
import {Typography} from "antd";
const {Title} = Typography;
const products = [
    {
        title: "Wireless Earbuds",
        price: "$99.99",
        image: "https://stylewatch.vtexassets.com/arquivos/ids/228633/Auriculares_EarFun_EFTW200B_01.jpg?v=638181976851600000"
    },
    {
        title: "Smartphone",
        price: "$599.99",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_778864-MLA70971122056_082023-F.webp",
    },
    {
        title: "Laptop",
        price: "$1299.99",
        image: "https://http2.mlstatic.com/D_NQ_NP_794284-MLU72023349707_092023-V.webp",
    },
    // Add more products as needed
];



const Ecommerce = () => {
    return (
        <div style={{padding: '16px 64px'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '32px'}}>
                <Title style={{color: '#899596'}}>Ecommerce</Title>
            </div>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Ecommerce;