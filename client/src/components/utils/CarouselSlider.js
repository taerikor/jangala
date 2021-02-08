import React from 'react'
import {Carousel} from 'antd'

function CarouselSlider({images}) {
    return (
        <Carousel autoplay>
            {images.map((image,index)=>(
                <div key={index}>
                    <img style={{width:'100%',maxHeight:'150px'}} src={`http://localhost:5000/${image}`} />
                </div>
            ))}
        </Carousel>
    )
}

export default CarouselSlider
