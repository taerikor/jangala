import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { auth } from '../_actions/user_action';
//eslint-disable-next-line
export default function(SpecificComponent, option, adminRoute = null){
    // option
        //null = 아무나 출입 가능
        //true = 로그인한 유저만
        //false = 로그인하면 출입 불가

    function AuthenticationCheck({history}) {

        const dispatch = useDispatch()

        useEffect(()=> {
            dispatch(auth()).then(res => {
                //로그인 하지 않은 상태
                if(!res.payload.isAuth) {
                    if (option) {
                        history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !res.payload.isAdmin){
                        history.push('/')
                    } else {
                        if(option === false)
                        history.push('/')
                    }
                }
            })
        }, [history,dispatch])
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}