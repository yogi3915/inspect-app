import "./register.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const REGISTER = gql`
  mutation Register($payload: RegisterUser!) {
    Register(payload: $payload) {
      _id
      first_name
      last_name
      email
      nationalin
      birth_date
      gender
    }
  }
`;

export default function RegisterPage() {
  const history = useHistory();
  const [inputRegister, setInputRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    nationalin: '',
    birth_date: '',
    gender: ''
  });
  const [register, { loading, error, data }] = useMutation(REGISTER)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/')
    }
  }, [])

  const handleInputChange = (input) => {
    setInputRegister({ ...inputRegister, [input.name]: input.value })
    console.log(inputRegister)
  }

  const handleRegister = (e) => {
    e.preventDefault();
    register({
      variables: {
        payload: inputRegister
      }
    })
      .then(data => {
        console.log(data)
        history.push('/sign-in')
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  return (
    <>
      <div className="uk-container">
        <div className="login-page">
          <div className="uk-child-width-expand@s uk-text-center login" uk-grid>
            <div className="title">
                <h1>INSPECT</h1>
                <p>We’ll be watching you</p>
            </div>
{/* <!--             <div className="card-login"> --> */}
              <div className="uk-card uk-card-default uk-card-body card-register">
                <form onSubmit={ handleRegister }>
                  <fieldset className="uk-fieldset">
                  <legend className="uk-legend">SIGN UP</legend>
                    <p className="legend-2">Have an account?</p>
                    <Link to="/sign-in">
                      <p className="legend-2 l-2" style={{color: "#E74C3C"}}>Lets sign in</p>
                    </Link>

                    <div className="uk-grid-column-medium uk-child-width-1-2 form" uk-grid>
                      <div className="uk-margin" style={{marginTop: 20}}>
                          <input className="uk-input" name="first_name" onChange={ (e) => handleInputChange(e.target) } value={ inputRegister.first_name } type="text" placeholder="First Name"/>
                      </div>
                      <div className="uk-margin">
                          <input className="uk-input" name="last_name" onChange={ (e) => handleInputChange(e.target) } value={ inputRegister.last_name } type="text" placeholder="Last Name"/>
                      </div>
                      <div className="uk-margin">
                          <input className="uk-input" name="email" onChange={ (e) => handleInputChange(e.target) } value={ inputRegister.email } type="text" placeholder="Email"/>
                      </div>
                      <div className="uk-margin">
                          <input className="uk-input" name="password" onChange={ (e) => handleInputChange(e.target) } value={ inputRegister.password } type="password" placeholder="Password"/>
                      </div>
                      <div className="uk-margin">
                          <input className="uk-input" name="nationalin" onChange={ (e) => handleInputChange(e.target) } value={ inputRegister.nationalin } type="text" placeholder="Nationalist"/>
                      </div>
                      <div className="uk-margin">
                          <input className="uk-input" name="birth_date" onChange={ (e) => handleInputChange(e.target) } value={ inputRegister.birth_date } type="date" placeholder="Birth Date"/>
                      </div>
                      <div className="uk-margin">
                        <select className="uk-select" value={ inputRegister.gender } name="gender" onChange={ (e) => handleInputChange(e.target) }>
                          <option value="">Any</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="uk-button uk-button-default btn-sign-up">SIGN UP</button>
                  </fieldset>
                </form>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
