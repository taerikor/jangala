import React, { useState } from 'react'
import { Input } from 'antd'

const {Search} = Input

function SearchFeature({reFreshFunction}) {
    const [searchTerm,setSearchTerm] = useState('')


    const onSearchChange = (e) => { 
        const {target:{value}} = e
        setSearchTerm(value)
        reFreshFunction(value)

    }

    return (
        <div>
           <Search 
           placeholder='Search'
           onChange={onSearchChange}
           style={{ width: 200}}
           value={searchTerm}
           />
        </div>
    )
}

export default SearchFeature
