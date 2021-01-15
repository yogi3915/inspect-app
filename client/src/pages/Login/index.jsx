import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import Google from "./img/google.png";
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const LOGIN = gql`
  mutation loginUser($payload: LoginUser!) {
  Login(payload: $payload) {
    token
    email
    role
  }
}
`;

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  })
  const history = useHistory();
  const [login, { error: loginError, loading: loginLoading, data: loadingData }] = useMutation(LOGIN)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    login({
      variables: {
        payload: loginInput
      }
    })
      .then(({ data }) => {
        localStorage.setItem('email', data.Login.email);
        localStorage.setItem('token', data.Login.token);
        localStorage.setItem('role', data.Login.role);
        history.goBack();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  const handleInputChange = (input) => {
    setLoginInput({ ...loginInput, [input.name]: input.value })
    console.log(loginInput)
  }

  return (
    <>
      <div className="uk-container">
        <div className="login-page">
          <div className="uk-flex uk-flex-between login">
            <div className="title">
                <h1>INSPECT</h1>
                <p>We’ll be watching you</p>
                <div className="btn-google">
                  <button className="uk-button uk-button-default btn-sign-in-google"><img src={Google} alt=""/> Continue with google</button>
                </div>
            </div>
              <div className="uk-card uk-margin-xlarge-left uk-card-default uk-card-body uk-text-center card-login">
              <button className="uk-button btn-back" onClick={ () => { history.push('/') } }><span uk-icon="chevron-right"></span></button>
                <form onSubmit={ handleLogin }>
                  <fieldset className="uk-fieldset">
                  <legend className="uk-legend">SIGN IN</legend>
                    <p className="legend-2">New user?</p>
                    <Link to="/sign-up">
                      <p className="legend-2 l-2" style={{color: "#E74C3C"}}>Lets sign up</p>
                    </Link>
                    <div className="uk-margin">
                        <input name="email" onChange={ (e) => handleInputChange(e.target) } value={ loginInput.email } className="uk-input uk-margin-top input-email" type="text" placeholder="Email"/>
                    </div>
                    <div className="uk-margin">
                        <input name="password" onChange={ (e) => handleInputChange(e.target) } value={ loginInput.password } className="uk-input uk-margin-top input-password" type="password" placeholder="Password"/>
                    </div>
                    <button type="submit" className="uk-button uk-button-default btn-sign-in">SIGN IN</button>
                  </fieldset>
                </form>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
