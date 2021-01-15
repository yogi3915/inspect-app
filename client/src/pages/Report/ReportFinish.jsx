import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ReportFinish() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/sign-in');
    }
  }, [])

  return (
    <div className="uk-container uk-margin-xlarge-top finish-report">
      <div className="uk-flex uk-height-medium uk-background-muted uk-margin uk-text-center">
        <div className="uk-margin-auto uk-margin-auto-vertical uk-width-1-2@s uk-card uk-card-default uk-card-body">
          <h1 style={{color: '#4cd137'}}>SUBMIT SUCCESS</h1>
          <p>Thank you for your report we’ll follow up soon</p>
        </div>
      </div>
    </div>
  )
}

export default ReportFinish