import React, { useState } from 'react'
import './UserCardBlock.css'
import { Button } from 'antd'

function UserCardBlock({products,removeFromCart}) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }




    const renderItems = () => (
        products && products.map((product, index) => (
            <tr key={index}>
                <td >
                    <img style={{ width: '70px', marginRight:'1rem'}} alt="product"
                        src={renderCartImage(product.images)} />
                    <span>{product.title}</span>
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    $ {product.price}
                </td>
                <td>
                    <Button onClick={() => removeFromCart(product._id)}>
                        Remove 
                    </Button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
