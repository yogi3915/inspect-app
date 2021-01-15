const { gql } = require('apollo-server')
const axios = require('axios').default;
const typeDefs = gql`
    type Articles {
        judul: String
        link: String
        poster: String
        tipe: String
        waktu: String
    }
    extend type Query {
        articles(q: String): [Articles] 
    }
`;

const resolvers = {
    Query : {
        articles: async (_, args) => {
            const { data } = await axios.get(`https://www.news.developeridn.com/search/?q=${args.q}`);
            const news = data.data
            if (news.length % 2 === 0) {
                return news
            } else {
                news.pop();
                return news;
            }
        }
    }
}

module.exports = { typeDefs, resolvers }
