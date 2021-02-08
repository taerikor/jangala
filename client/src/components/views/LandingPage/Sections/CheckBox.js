import React, { useState } from 'react'
import { Collapse , Checkbox} from 'antd'

const { Panel } = Collapse

function CheckBox({list,handleFilters}) {
    const [checked,setChecked] = useState([])

    const onToggleCheck = (value) => {
        const currentIndex = checked.indexOf(value)

        const newChecked = [...checked]

        if(currentIndex === -1) {
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked)
        handleFilters(newChecked)
    }
    
    const renderCheckboxLists = () => list && list.map((item,index)=>(
        <Checkbox 
        key={index} 
        onChange={()=> onToggleCheck(item._id)}
        checked={checked.indexOf(item._id) === -1 ? false : true}
        > {item.name} </Checkbox>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Panel Header" key='1'>
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
            
        </div>
    )
}

export default CheckBox
