import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './adminDetail.css';

const GET_DETAIL = gql`
  query getReport($id: ID) {
    report(_id: $id) {
      _id
      UserEmail
      case
      entity
      province
      city
      dateHappened
      description
      isDocumentProvided
      involvedPerson
      personRole
      isReported
      isKeepInTouch
      aboutInspectApp
      status
    }
  }
`;

export default () => {
  const { reportId } = useParams();
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      id: `${reportId}`
    }
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  
  return (
    <div>
      <div className="uk-container">
        <div className="data-detail">
        <label>ID: { data?.report._id }</label>
        <div className="uk-margin">
          <label>Case: </label>
        </div>
        <div class="uk-margin">
          <input className="uk-input custom-uk-input" type="text" placeholder="Input"value={ data?.report.case } disabled/>
        </div>
        <div className="uk-margin">
          <label>Description: </label>
        </div>
        <div className="uk-margin">
          <textarea className="uk-textarea" rows="5" placeholder="Textarea" value={ data?.report.description } disabled ></textarea>
        </div>
        <div className="uk-margin">
          <label>Local Government: </label>
        </div>
        <div className="uk-margin">
          <input className="uk-input custom-uk-input" type="text" value={ data?.report.entity } disabled />
        </div>
        <div className="uk-margin">
          <label>Province: </label>
        </div>
        <div className="uk-margin">
          <input className="uk-input custom-uk-input" type="text" value={ data?.report.province } disabled />
        </div>
        <div className="uk-margin">
          <label>City: </label>
        </div>
        <div className="uk-margin">
          <input className="uk-input custom-uk-input" type="text" value={ data?.report.city } disabled />
        </div>
        <div className="uk-margin">
          <label>Date Happened: </label>
        </div>
        <div className="uk-margin">
          <input className="uk-input custom-uk-input" type="date" value={ data?.report.dateHappened } disabled />
        </div>
        </div>
      </div>
    </div>
  )
}