import React from 'react';
import './reportStep1.css';

export default function Report1(props) {
  const { handleChange, input, location, getCity } = props

  return (
    <>
      <div className="uk-container report-step-1">
        <div className="uk-flex uk-flex-between">
          <div>
            <h2 className="q1-custom">SELECT THE KIND OF ENTITY INVOLVED IN THE INCIDENT</h2>
            <hr />
            <div className="a1-rad-custom">
              <input
                onChange={e => handleChange(e)}
                className="rad-input" type="radio"
                name="entity" id="Local Government"
                value="Local Government" />
              <label htmlFor="Local Government">Local Government</label> <br />
              <input onChange={e => handleChange(e)} className="rad-input" type="radio" name="entity" id="Provincial Government" value="Provincial Government" />
              <label htmlFor="Provincial Government">Provincial Government</label> <br />
              <input onChange={e => handleChange(e)} className="rad-input" type="radio" name="entity" id="National Government" value="National Government" />
              <label htmlFor="National Government">National Government</label> <br />
              <input onChange={e => handleChange(e)} className="rad-input" type="radio" name="entity" id="Private Sector" value="Private Sector" />
              <label htmlFor="Private Sector">Private Sector</label> <br />
            </div>
          </div>
          <div>
            <div className="a2-custom">
              <h2 className="q2-custom">PLEASE CHOOSE THE LOCATION WHERE THE INCIDENT TOOK PLACE</h2>
              <hr />
              <div className="input-province">
                <label htmlFor="province">Province</label> <br />
                <select
                  onChange={e => handleChange(e)}
                  onClick={getCity}
                  name="province"
                  id="province"
                >
                  <option value="">Select Provinces</option>
                  {
                    location.province.map(prov => {
                      return (
                        <option key={prov.id} value={`${prov.nama},${prov.id}`}>{prov.nama}</option>
                      )
                    })
                  }
                </select>
              </div>
              <br />
              <div className="input-city">
                <label htmlFor="city">City</label> <br />
                <select onChange={e => handleChange(e)} name="city" id="city">
                  <option value="">Select City</option>
                  {
                    location.city.map(ct => {
                      return (
                        <option key={ct.id} value={ct.nama}>{ct.nama}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}