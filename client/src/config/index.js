import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const reportData1 = makeVar({
  case: "",
  entity: "",
  province: "",
  city: ""
})

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

export const reportData2 = makeVar({
  dateHappend:'',
  description: '',
  isDocumentProvided: '',
  involvedPerson: '',
  personRole: '',
  isReported: '',
})

export const reportData3 = makeVar({
  isKeepInTouch: '',
  aboutInspectApp: ''
})

export default client