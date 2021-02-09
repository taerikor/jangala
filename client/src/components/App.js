import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage';
import NavBar from './views/NavBar/NavBar';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from '../hoc/auth';
import ProfileEditPage from './views/ProfileEditPage/ProfileEditPage';
import UploadPage from './views/UploadPage/UploadPage';
import ProductDetailPage from './views/ProductDetailPage/ProductDetailPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '65px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
        <Route exact path='/' component={Auth(LandingPage, null)} />
        <Route exact path='/login'component={Auth(LoginPage, false)} />
        <Route exact path='/register' component={Auth(RegisterPage, false)} />
        <Route exact path='/profile/edit' component={Auth(ProfileEditPage, true)} />
        <Route exact path='/product/upload' component={Auth(UploadPage, true)} />
        <Route exact path='/product/:productId' component={Auth(ProductDetailPage, null)} />
        <Route exact path='/user/cart' component={Auth(CartPage, true)} />
        <Route exact path='/history' component={Auth(HistoryPage, true)} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
