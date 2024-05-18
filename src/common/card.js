import {Button, Card as AntCard} from 'antd';

const {Meta} = AntCard;


export const Card = ({
                         title,
                         price,
                         image,
                     }) => {

    return (
        <AntCard
            hoverable
            style={{width: 240}}
            cover={<img
                style={{
                    padding: '8px',
                    width: '120px',
                    height: '108px',
                    margin: 'auto'
                }}
                alt="example" src={image}
            />}
            actions={[
                <Button type="primary">Buy</Button>,
            ]}
        >
            <Meta title={title} description={price}/>
        </AntCard>
    )

}