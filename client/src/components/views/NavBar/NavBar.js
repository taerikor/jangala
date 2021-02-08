import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout, Menu,Dropdown } from 'antd';

const { Header } = Layout;


function NavBar({history}) {
    const [isAuth,setIsAuth] = useState(false)
    const [userImage,setUserImage] = useState('')
    const state = useSelector(res => res?.user);
    

    useEffect(() => {
        if(state.userData?.isAuth){
            setIsAuth(true)
            setUserImage(state.userData.image)
        }else{
            setIsAuth(false)
        }
       
    },[state])

    const onClick = () => {
        axios.get('/api/users/logout')
             .then(res => {
                 if(res.data.success) {
                    history.push('/login')
                 }else {
                     alert('failed logout')
                 }
             })
    }

    const menu = (
        <Menu >
        <Menu.Item key="0"  >
            <a href='/profile/edit' >Edit</a>
        </Menu.Item>
        <hr />
        <Menu.Item key="1"  onClick={onClick}>
            <span>Logout</span>
        </Menu.Item>
        </Menu>
    )

    

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item style={{float: 'left'}} key="1"><Link to='/' style={{display:'flex',alignItems:'center'}} >LOGO</Link></Menu.Item>
        {isAuth?
            <>
            <Dropdown  overlay={menu} trigger={['click']}>
                <div style={{float: 'right',marginLeft:'30px'}} className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                    <img src={userImage} alt='profile'  style={{borderRadius:'50%',width:'2.5rem'}} />
                </div>
            </Dropdown>
             <Menu.Item style={{float: 'right'}} key="2"><Link to='/product/upload'>UPLOAD</Link></Menu.Item>
            </>
                :
                <>
                <Menu.Item key="4" style={{float: 'right'}}>
                    <Link to='/login' >SIGN IN</Link>
                </Menu.Item>
                <Menu.Item key="5" style={{float: 'right'}}>
                    <Link to='/register' >SIGN UP</Link>
                </Menu.Item>
                </>
                }
      </Menu>
    </Header>
        </Layout>
    )
}

export default withRouter(NavBar)
