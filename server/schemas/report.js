const { gql } = require('apollo-server')
const { makeReports, getReports, updateReport, deleteReport, getReportById } = require('../models/report')

const typeDefs = gql`
  type Report {
    _id: ID
    UserEmail: String
    case: String
    entity: String
    province: String
    city: String
    dateHappened: String
    description: String
    isDocumentProvided: String
    involvedPerson: [String]
    personRole: String
    isReported: String
    isKeepInTouch: String
    aboutInspectApp: String
    status: String
  }

  input newReport {
    case: String!
    entity: String!
    province: String!
    city: String!
    dateHappened: String!
    description: String!
    isDocumentProvided: String!
    involvedPerson: [String]!
    personRole: String!
    isReported: String!
    isKeepInTouch: String!
    aboutInspectApp: String
    UserEmail: String!
    status: String!
  }
  extend type Query {
    reports: [Report]
    report(_id: ID): Report
  }
  extend type Mutation {
    AddReport(payload: newReport!): Report
    UpdateReport(_id: ID, status: String!) : Report
    DeleteReport(_id: ID) : Report
  }
`

const resolvers = {
  Query: {
    reports: async () => {
      try {
        const reports = await getReports()
        return reports
      } catch (error) {
        return error
      }
    },
    report: async (_, args) => {
      try {
        const { _id } = args
        const report = await getReportById(_id)
        return report
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    AddReport: async (_, args) => {
      try {
        const { payload } = args
        const data = { ...payload, status: "Waiting for Submission"}
        const newReports = await makeReports(data)
        return newReports.ops[0]
      } catch (error) {
        return error
      }
    },
    UpdateReport: async (_, args) => {
      try {
        const { _id, status } = args
        const updatedReport = await updateReport(_id, status)
        return updatedReport.value
      } catch (error) {
        return error
      }
    },
    DeleteReport: async (_, args) => {
      try {
        const { _id } = args
        const deletedReport = await deleteReport(_id)
        return deletedReport.value
      } catch (error) {
        return error
      }
    }
  }
}

module.exports = { typeDefs, resolvers }