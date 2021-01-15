import React from 'react';
import './reportStep2.css';

export default function Report2(props) {

  const { handleChange, input, setInput } = props
  return (
    <div className="uk-container">
      <div className="uk-flex report-step-2">
        <div className="side-left">
          <h3>PLEASE DESCRIBE THE INCIDENT WITH AS MUCH DETAIL AS POSSIBLE</h3>
          <div className="q-1-sect">
            <div className="uk-margin">
              <label htmlFor="dateHappened">When did it happen?</label>
              <input
                onChange={e => handleChange(e)}
                type="date"
                className="uk-input"
                name="dateHappened"
                id="dateHappened" />
            </div>
            <div className="uk-margin">
              <label htmlFor="description">What happened?</label>
              <textarea
                onChange={e => handleChange(e)}
                className="uk-textarea"
                rows="5"
                name="description"
                id="description"></textarea>
            </div>
            {/* <label htmlFor="">Could you provide the documents?</label>
            <div className="a1-rad-custom">
              <div className="uk-margin">
                <input
                  onChange={e => handleChange(e)}
                  className="uk-radio"
                  type="radio"
                  name="isDocumentProvided"
                  id="Yes" 
                  value="true"
                  />
                <label htmlFor="Yes"> Yes</label>
              </div>
              <div className="uk-margin">
                <input
                  onChange={e => handleChange(e)}
                  className="uk-radio"
                  type="radio"
                  name="isDocumentProvided"
                  id="No" 
                  value="false"
                  />
                <label htmlFor="No"> No</label>
              </div>
            </div> */}
          </div>
        </div>
        <div className="side-right">
          <h3>CAN YOU NAME AN INDIVIDUAL, OR PROVIDE ANY INFORMATION THAT WOULD HELP IDENTIFY AN INDIVIDUAL?</h3>
          <div className="q-2-sect">
            <div className="uk-margin">
              <label htmlFor="involvedPerson">Name(s) of the person(s) involved</label>
              <textarea
                onChange={e => handleChange(e)}
                className="uk-textarea"
                name="involvedPerson"
                id="involvedPerson"
                rows="5"></textarea>
            </div>
            <div className="uk-margin">
              <label htmlFor="personRole">Role of the person</label>
              <textarea
                onChange={e => handleChange(e)}
                className="uk-textarea"
                name="personRole"
                id="personRole"
                rows="5"></textarea>
            </div>
            <label htmlFor="">Have you already reported the incident to another authority?</label>
            <div className="a1-rad-custom">
              <div className="uk-margin">
                <input
                  onChange={e => handleChange(e)}
                  className="uk-radio"
                  type="radio"
                  name="isReported"
                  id="Yes"
                  value="true"
                />
                <label htmlFor="Yes">Yes</label>
              </div>
              <div className="uk-margin">
                <input
                  onChange={e => handleChange(e)}
                  className="uk-radio"
                  type="radio"
                  name="isReported"
                  id="No"
                  value="false"
                />
                <label htmlFor="No">No</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}