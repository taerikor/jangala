import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


function LoginPage({history}) {
    const dispatch = useDispatch();

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onChange = (e) => {
        const {target: {name,value}} = e;
        if(name === 'email'){
            setEmail(value)
        }else if(name === 'password'){
            setPassword(value)
        }
    }

    const onSubmit = () => {
        let body = {
            email,
            password,
        }
        dispatch(loginUser(body))
        .then(res => {
            if(res.payload.loginSuccess){
                window.localStorage.setItem('userId', res.payload.userId);
                history.push('/')
            } else {
                alert('Error')
            }
        })

    }
    return (
      <div style={{
          display: 'flex', justifyContent: 'center' , alignItems: 'center',
          width: '100%', height: '100vh'
       }}>
          <Form {...layout}
          name="basic"
          initialValues={{remember: true,}}
          onFinish={onSubmit} >
              <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your Email!',
                      },
                         ]}>
              <Input name='email' value={email} type='email' onChange={onChange}/>
              </Form.Item>
              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                  {
                      required: true,
                      message: 'Please input your password!',
                  },
                         ]}>
              <Input.Password name='password' value={password} type='password'  onChange={onChange}/>
               </Form.Item>
              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                              Log in
                  </Button>
              </Form.Item>
              </Form>
        </div>
    )
}

export default withRouter(LoginPage)
