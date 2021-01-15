import React from 'react';
import './reportStep3.css';

export default function Report3(props) {

  const { handleChange, input, setInput } = props

  return (
    <div className="uk-container uk-margin-xlarge-top report-step-3">
      <div className="uk-flex">
        <div className="left-side">
          <h4>WE WOULD LIKE TO GET IN TOUCH WITH YOU FOR FURTHER INFORMATION</h4>
          <div className="a1-rad-custom">
            <div className="uk-margin">
              <label>
                <input
                  onChange={e => handleChange(e)}
                  value="true"
                  className="uk-radio"
                  type="radio"
                  name="isKeepInTouch" /> Yes, please keep in touch with me</label>
            </div>
            <div className="uk-margin">
              <label>
                <input
                  onChange={e => handleChange(e)}
                  value="false"
                  className="uk-radio"
                  type="radio"
                  name="isKeepInTouch" /> No, please do not contact me in future</label>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="uk-margin-large-left">
          <h4>PLEASE HELP US IMPROVE OUR SERVICE. HOW DID YOU LEARN ABOUT INSPECT APP?</h4>
            <textarea
              onChange={e => handleChange(e)}
              name="aboutInspectApp"
              className="uk-textarea"
              rows="5"
              placeholder="Textarea">
            </textarea>
          </div>
        </div>
      </div>
    </div >
  )
}