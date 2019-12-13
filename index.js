const { ApolloServer } = require('apollo-server');


const photos = [];
let _id = 0;

// type description


const typeDefs =`
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
    }

    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    } 

    type Query {
        totalPhotos: Int!,
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
`;


// Resolver function returns data of denoted type
const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },
    Mutation: {
        postPhoto(parent, args) { // parent is alink to parent object (Mutation). it is always the 1st arg
            const newPhoto = {
                id: _id++,
                ...args
            }
            
            
            photos.push(newPhoto);
            
            return newPhoto;
        }
    },
    Photo: { // trivial resolver
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`
    }
}

const server = new ApolloServer({ // new server instance
    typeDefs,
    resolvers
});

server
    .listen() // 
    .then(({url}) => console.log(`GraphQL Service running on ${url}`));