import './style.css';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ReactLoading from 'react-loading';
import News from '../../components/News/index';
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';

const GET_NEW = gql`
  query News($q: String) {
    articles(q: $q) {
      judul
      link
      poster
      tipe
      waktu
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_NEW, {
    variables: {
      q: 'corruption'
    }
  });

  if (data) {
    console.log(data);
  }

  return (
    <React.Fragment>
      <section className="home-section">
        <div className="home-image"></div>
          <div className="uk-container header-home">
            <h1>Be The <span style={{color: '#4cd137', fontWeight: 700}}>Observers</span> Truth <span style={{color: '#4cd137', fontWeight: 700}}>With</span> Us</h1>
            <div className="box">
              <p style={{color: 'white', marginTop: 30, marginLeft: 30}}>Credibility</p>
              <p style={{color: 'white', marginTop: -25, marginLeft: 30}}>company</p>
              <hr className="ez-liner"/>
            </div>
            <div className="box-1"></div>
            <div className="box-2">
              <p style={{color: 'black', marginTop: 7, marginLeft: 20}}>Want To Get Involved, But Don't Know How ?</p>
              <hr className="ez-liner2"/>
            </div>
            <div className="box-3">
              <span uk-icon="icon: comments; ratio: 3" style={{color: 'white', marginTop: 40, marginLeft: 30}}>
              <p>Report case</p>
              </span>
            </div>
          </div>
          <div className="uk-container">
            <div className="home-content">
              <div className="uk-flex uk-flex-between">
                <div>
                  <Link to="/tax-and-credibility">
                    <button className="uk-button ins-button ins-button-1">Inspect</button>
                  </Link>
                </div>
                <div>
                  <Link to="/c">
                    <button className="uk-button ins-button ins-button-2">Report</button>
                  </Link>
                </div>
              </div>
                <div className="uk-flex uk-flex-between uk-margin-xlarge-top">
                  <div className="">
                    <h1 style={{width: 500, textTransform: 'uppercase'}}>Fighting corruption starts with you</h1>
                  </div>
                  <div className="social-media">
                    <img src={youtube} width='40' style={{marginRight: 40}} alt=""/>
                    <img src={twitter} width='40' style={{marginRight: 40}} alt=""/>
                    <img src={linkedin} width='40' style={{marginRight: 40}} alt=""/>
                    <img src={instagram} width='40' alt=""/>
                  </div>
                </div>
              <div className="news">
                <h3>News</h3>
                {loading &&
                <div className="loading">
                  <ReactLoading type="spinningBubbles" color="#4cd137" className="loading-spinner"/>
                </div>
                }
                <div className="news-container uk-column-1-2">
                {data?.articles.map((article, index) => (
                  <News key={index} article={article}/>
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
  )
}