import { gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Form, { Page } from 'react-form-carousel'
import { useHistory, useParams } from 'react-router-dom'
import Report1 from '../../components/Forms/report1'
import Report2 from '../../components/Forms/report2'
import Report3 from '../../components/Forms/report3'
import Swal from 'sweetalert2'

export default function MainReport() {
  const history = useHistory()
  const { report } = useParams()


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/sign-in');
      Swal.fire({
        icon: 'error',
        text: 'You need to sign-in to give report!'
      })
    }
  }, [])

  const MAKE_REPORT = gql`
    mutation AddReport($payload: newReport!) {
      AddReport(payload: $payload) { 
        _id 
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
      }
    }
  `

  const SEND_MAIL = gql`
    mutation sendMail($payload: mailInfo!) {
      mail(payload: $payload) { message }
    }
  `

  const [addReport] = useMutation(MAKE_REPORT)
  const [sendMail] = useMutation(SEND_MAIL)
  const receiverMail = localStorage.getItem('email')

  const [input, setInput] = useState({
    case: report.split('-').join(' '),
    entity: '',
    province: '',
    city: '',
    dateHappened: '',
    description: '',
    isDocumentProvided: '',
    involvedPerson: '',
    personRole: '',
    isReported: '',
    isKeepInTouch: '',
    aboutInspectApp: '',
    UserEmail: receiverMail
  })
  const [location, setLocation] = useState({
    province: [],
    city: []
  })
  const [provId, setProvId] = useState('')

  useEffect(() => {
    fetch('https://ibnux.github.io/data-indonesia/propinsi.json')
      .then(res => res.json())
      .then(prov => setLocation({
        ...location,
        province: prov
      }))
      .catch(err => err)
  }, [])

  function getCity() {
    fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${provId}.json`)
      .then(res => res.json())
      .then(city => setLocation({
        ...location,
        city: city
      }))
      .catch(err => err)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: name === 'province' ? value.split(',')[0] : value
    })
    if (name === "province") {
      setProvId(value.split(',')[1])
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.isKeepInTouch === "true") {
      sendMail({
        variables: {
          payload: {
            toReceiver: receiverMail,
            subjectEmail: 'Report Submission',
            message: `
            <p>Your Report has been recorded, because you choose to keep in touch with us, we'll inform you any status of your report.</p>                       
            <p>
              Case: ${input.case} <br/>
              Entity: ${input.entity} <br/>
              Date Happened: ${input.dateHappened} <br/>
              Location: ${input.city}, ${input.province} <br/>
              Description: ${input.description} <br/>
              Involved Person: ${input.involvedPerson}
            </p>
            `
          }
        }
      })
    }
    const email = localStorage.getItem('email')
    addReport({
      variables: { payload: input }
    })
    history.push('/report-finish')
  }

  return (
    <>
      <Form onSubmit={e => onSubmit(e)} navigation>
        <Page>
          <Report1
            handleChange={handleChange}
            input={input}
            setInput={setInput}
            location={location}
            getCity={getCity}
          />
        </Page>
        <Page>
          <Report2
            handleChange={handleChange}
            input={input}
            setInput={setInput}
          />
        </Page>
        <Page>
          <Report3
            handleChange={handleChange}
            input={input}
            setInput={setInput}
          />
        </Page>
      </Form>
    </>
  )
}