import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../_actions/user_action';

function ProductInfo({detail}) {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(addToCart(detail._id))
    }
    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={onClick}>
                    Add to Cart
                </Button>
            </div>


        </div>
    )
}

export default ProductInfo
