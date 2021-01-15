import './tax.css';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import ReactLoading from 'react-loading';
import Tax from '../../assets/tax.png';
import Credibility from '../../assets/credibility.png';
import swal from 'sweetalert';

const CREDIBILITY = gql`
  mutation Credibility($company: String) {
    credibility(company: $company) {
      name
      kpbn
      indoInvestments
      idx
      npwp
      email
      telephone
      address
      score
    }
  }
`;

const NPWP_VALIDATOR = gql`
  mutation Npwp($number: String) {
    npwp(number: $number) {
      npwpIsValid
    }
  } 
`;

export default function TaxAndCredibility() {
  const [company, setCompany] = useState('');
  const [npwp, setNpwp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [credibilityResult, setCredibilityResult] = useState('');

  function onChange(e) {
    const value = e.target.value;
    setCompany(value);
  };

  function onChangeNpwp(e) {
    const value = e.target.value;
    console.log(value);
    setNpwp(value);
  }

  const [credibility, { loading, error, data }] = useMutation(CREDIBILITY);
  const [npwpValidator, { loading: npwpLoading, error: npwpError, data: npwpData }] = useMutation(NPWP_VALIDATOR);

  function onSubmitNpwp(e) {
    e.preventDefault();
    console.log("submit npwp");
    console.log(typeof npwp);
    npwpValidator({
      variables: {
        number: npwp
      }
    }).then(({ data }) => {
      if (data.npwp.npwpIsValid) {
        setSuccessMessage('Tax ID is valid');
        setErrorMessage('');
        setCredibilityResult('');
      } else {
        setErrorMessage('Tax ID is invalid');
        setSuccessMessage('');
        setCredibilityResult('');
      }
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000)
      console.log(data.npwp.npwpIsValid);
    })
  }

  function onSubmitCredibility(e) {
    e.preventDefault();
    credibility({
      variables: {
        company: company
      }
    }).then(({ data }) => {
      const { credibility } = data;
      console.log(credibility)
      setCredibilityResult(credibility);
      setSuccessMessage('');
      setErrorMessage('');
      // setTimeout(() => {
      //   setCredibilityResult('');
      // }, 5000)
      console.log(credibility);
    })
  }

  return (
    // alert credibility
    <React.Fragment>
      <div className="uk-container tax-credibility">
        <div className="result-heading uk-text-center uk-align-center">
          <p className="">Result will be here</p>
        </div>
        { credibilityResult && !loading ?
          <div className="credibility-alert" uk-alert>
            <a style={{color: 'black', padding: 10, top: 0, width: 100, height: 100}} class="uk-alert-close" uk-close></a>
            <ul>
              { credibilityResult.name ? 
                <li>Company Name: { credibilityResult.name }</li>
              :
                ''
              }
              { credibilityResult.kpbn ? 
                <li style={{color: '#4cd137'}}>Listed on <a target="_blank" href="https://kpbn.co.id/persh.php?alphabet=a">KPBN</a> <span style={{color: '#4cd137'}} class="uk-margin-medium-left" uk-icon="check"></span></li>
              :
                <li style={{color: '#e74c3c'}}>Not listed on <a target="_blank" href="https://kpbn.co.id/persh.php?alphabet=a">KPBN</a> <span style={{color: '#e74c3c'}} class="uk-margin-medium-left" uk-icon="ban"></span></li>
              }
              { credibilityResult.indoInvestments ? 
                <li style={{color: '#4cd137'}}>Listed on <a target="_blank" href="https://kpbn.co.id/persh.php?alphabet=a">Indonesia Investments</a> <span style={{color: '#4cd137'}} class="uk-margin-medium-left" uk-icon="check"></span></li>
              :
                <li style={{color: '#e74c3c'}}>Not listed on <a target="_blank" href="https://kpbn.co.id/persh.php?alphabet=a">Indonesia Investments</a> <span style={{color: '#e74c3c'}} class="uk-margin-medium-left" uk-icon="ban"></span></li>
              }
              { credibilityResult.idx ? 
                <li style={{color: '#4cd137'}}>Listed on <a target="_blank" href="https://www.idx.co.id/perusahaan-tercatat/profil-perusahaan-tercatat/">IDX</a> <span style={{color: '#4cd137'}} class="uk-margin-medium-left" uk-icon="check"></span></li>
              :
                <li style={{color: '#e74c3c'}}>Not listed on <a target="_blank" href="https://www.idx.co.id/perusahaan-tercatat/profil-perusahaan-tercatat/">IDX</a> <span style={{color: '#e74c3c'}} class="uk-margin-medium-left" uk-icon="ban"></span></li>
              }
              <li>NPWP: { credibilityResult.npwp }</li>
              <li>Email Addres: { credibilityResult.email }</li>
              <li>Telephone: { credibilityResult.telephone }</li>
              <li>Address: { credibilityResult.address }</li>
            </ul>
          </div>
        :
          ''
        }
        { successMessage ? 
          <div className="uk-alert npwp-alert" uk-alert="true">
            {/* <a className="uk-alert-close" uk-close="true"></a> */}
            <p style={{color: '#4cd137'}}>{ successMessage }</p>
          </div>
        :
          ''
        }
        {
          errorMessage ?
            <div className="uk-alert npwp-alert" uk-alert="true">
              {/* <a className="uk-alert-close" uk-close="true"></a> */}
              <p style={{color: '#e84118'}}>{ errorMessage }</p>
            </div>
          :
            ''
        }
        {loading && 
          <div className="loading">
            <ReactLoading type="spinningBubbles" color="#4cd137"/>
          </div>
        }
        <div className="uk-child-width-expand@s uk-text-center main-content-tax" uk-grid="true">
          <div className="uk-card uk-card-hover uk-card-body">
              <h3>Tax Validator</h3>
            <form onSubmit={onSubmitNpwp}>
              <fieldset className="uk-fieldset">
                <div className="uk-margin">
                    <input name="npwp" value={npwp} onChange={onChangeNpwp} className="uk-input" type="text" placeholder="Insert your tax id"/>
                </div>
                <button type="submit" className="uk-button btn-submit">SUBMIT</button>
              </fieldset>
            </form>
            <article class="uk-article" style={{marginTop: 50}}>
              <p class="uk-article-meta" style={{fontSize: 18, fontWeight: 700}}>Taxpayer Identification Number, is a number that must be owned for every individual, or business entity with income. Where the provisions of the taxpayer have been regulated in law number 16, 2009. Now, all the complete information regarding the data and the amount that must be paid by the taxpayer, you can do it online. In fact, how to check your Tax ID number online, now it can be done very easily and quickly</p>
            </article>
            <div className="icon">
              <img src={Tax} width="50"/>
            </div>
          </div>
          <div className="uk-card uk-card-hover uk-card-body">
            <h3>Credibility</h3>
            <form onSubmit={onSubmitCredibility}>
              <fieldset className="uk-fieldset">
                <div className="uk-margin">
                    <input className="uk-input" name="company" value={company} onChange={onChange} type="text" placeholder="Insert company name"/>
                </div>
              </fieldset>
              <button type="submit" className="uk-button btn-submit">SUBMIT</button>
            </form>
            <article class="uk-article" style={{marginTop: 50}}>
              <p class="uk-article-meta" style={{fontSize: 18, fontWeight: 700}}>Not only that you can check taxpayer identification number, you can also check any company's credibility by putting their company name as we identify their credibility</p>
            </article>
            <div className="icon">
              <img src={Credibility} width="50"/>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}