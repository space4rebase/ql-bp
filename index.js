const { ApolloServer } = require('apollo-server');




// type description

const typeDefs =`
    type Query {
        totalPhotos: Int!
    }
`;


// Resolver function returns data of denoted type
const resolvers = {
    Query: {
        totalPhotos: () => 42 // common name: totalPhotos
    }
}

const server = new ApolloServer({ // new server instance
    typeDefs,
    resolvers
});

server
    .listen() // 
    .then(({url}) => console.log(`GraphQL Service running on ${url}`));