import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input  } from 'antd';
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;

function ProfilePage({history}) {
    const user = useSelector(state => state.user)

    const [isEdit,setIsEdit] = useState(false)
    const [newName,setNewName] = useState('')
    const [filePath,setFilePath] = useState('')
    const [isSubmit,setIsSubmit] = useState(false)

    useEffect(()=>{
        if(user.userData){
            setFilePath(user.userData.image)
        }
    },[user])


    const onNameChange = (e) => {
        const {target:{value}} = e;
        setNewName(value)
    }

    const onNameSubmit = (e) => {
        e.preventDefault();

        let nameEditVariable = {
            userId:localStorage.getItem('userId'),
            newName
        }

        axios.post('/api/users/editUserName',nameEditVariable)
        .then(res => {
            if(res.data.success){
                history.push('/')
                message.success('Edit Success')
            }else{
                alert('failed edit name')
            }
        })
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        console.log(files[0])
        axios.post('/api/users/uploadImage', formData, config)
        .then(res => {
            if(res.data.success){
                console.log(res.data)
                setFilePath(`http://localhost:5000/${res.data.filePath}`)
                setIsSubmit(true)
            }else{
                alert('failed to save the Image in server')
            }
        })

    }

    const onImgSubmit = (e) => {
        e.preventDefault()

        let imgEditVariable = {
            userId:localStorage.getItem('userId'),
            image:filePath
        }

        axios.post('/api/users/editImage',imgEditVariable)
        .then(res => {
            if(res.data.success){
                history.push('/')
                message.success('Edit Success')
            }else{
                alert('failed edit image')
            }
        })

    }

    const onToggleEdit = () => {
        setIsEdit(!isEdit)
    }
    if(user.userData){

        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Profile</Title>
            </div>
    
                <div style={{ display: 'flex', flexDirection:'column' }}>
            <Form style={{display:'flex', flexDirection:'column',alignSelf:'center'}} onSubmit={onImgSubmit} >
                    <Dropzone 
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '240px', height: '240px', border: '2px solid lightgray' ,borderRadius:'50%' }}
                                {...getRootProps()}
                            >
                                <img src={filePath} alt='profile' style={{width: '100%', height: '100%',borderRadius:'50%'}}/>
                                <input {...getInputProps()} />
    
                            </div>
                        )}
                    </Dropzone>
                    {isSubmit && <Button style={{marginTop:'2rem'}} type="primary" size="large" onClick={onImgSubmit} >
                                    Submit
                                </Button>}
                        </Form >
    
                        <div style={{marginTop:'3rem'}}>
                                <label>UserName</label>
                                <hr/>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h3>{user.userData.name}</h3>
                                <span onClick={onToggleEdit} style={{float:'right',color:'skyblue',cursor:'pointer'}}>Edit</span>
                            </div>
                            {isEdit&& <Form onSubmit={onNameSubmit} style={{display:'flex'}}>
                                <Input
                                        name='name'
                                        onChange={onNameChange}
                                        value={newName}
                                />
                                <Button type="primary" size="large" onClick={onNameSubmit} >
                                    Submit
                                </Button>
                             </Form> }
                        </div>
                </div>
    
                <br /><br />
                <Title level={3} > Subscriber </Title>
                <hr/>
                <br /><br />
        </div>
        )
    }else {
        return <h1>Loading...</h1>
    }
}

export default withRouter(ProfilePage )
