import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import MegaPhone from '../../assets/megaphone.png';
import Employment from '../../assets/employment.png';
import PieChart from '../../assets/pie-chart.png';
import Hand from '../../assets/hand.png';

export default () => {

  return (
    <React.Fragment>
      <div className="cases-container uk-margin-medium-top">
        <div className="uk-container">
          <div className="title">
            <h2>What the <span style={{color: '#4cd137', fontWeight: 700}}>cases</span> ?</h2>
          </div>
          <div className="cases-contents">
            <div className="cases-content uk-margin-bottom">
              <div className="uk-card uk-card-hover uk-card-body abuse-of-power">
                <h2>Abuse of power</h2>
                <ul className="uk-list">
                  <li><Link to="/report/abuse-of-public-fund" style={{color: "black"}} >Abuse of public fund</Link></li>
                  <li><Link to="/report/abuse-of-assets" style={{color: "black"}} >Abuse of assets</Link></li>
                  <li><Link to="/report/abusing-a-position" style={{color: "black"}} >Abusing a position</Link></li>
                </ul>
                <div className="icon">
                  <img src={MegaPhone} width="50"/>
                </div>
              </div>
            </div>
            <div className="cases-content">
              <div className="uk-card uk-card-hover uk-card-body employment">
                <h2>Employment</h2>
                <ul className="uk-list">
                  <li><Link to="/report/corruption-to-get-a-job" style={{color: "black"}} >Corruption to get a job</Link></li>
                  <li><Link to="/report/fake-or-ghost-work" style={{color: "black"}} >Fake / ghost work</Link></li>
                </ul>
                <div className="icon">
                  <img src={Employment} width="50"/>
                </div>
              </div>
            </div>
            <div className="cases-content uk-margin-top">
              <div className="uk-card uk-card-hover uk-card-body hover">
                <h2>Hover</h2>
                <ul className="uk-list">
                  <li><Link to="/report/corruption-to-get-a-tender" style={{color: "black"}} >Corruption to get a tender</Link></li>
                  <li><Link to="/report/irregularities-related-to-a-tender-process" style={{color: "black"}} >Irregularities related to a tender process</Link></li>
                </ul>
                <div className="icon">
                  <img src={PieChart} width="50"/>
                </div>
              </div>
            </div>
            <div className="cases-content uk-margin-top">
              <div className="uk-card uk-card-hover uk-card-body bribery">
                <h2>Bribery</h2>
                <ul className="uk-list">
                  <li><Link to="/report/bribe-was-involved" style={{color: "black"}} >Bribe was involved</Link></li>
                </ul>
                <div className="icon">
                  <img src={Hand} width="50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}