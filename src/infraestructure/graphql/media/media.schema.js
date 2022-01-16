export const mediaSchema = `#graphql
    type Media {
        _id:ID
        size:Int!
        name: String!
        url: String!
    }

    input MediaInput{
        size:Int!
        name: String!
        url: String!
    }

    input MediaUpdate{
        id:ID!
        size:Int!
        name: String!
        url: String!
    }
`

export const mediaQuery = `#graphql
    getMedia(id:ID!): Media
`

export const mediaMutation = `#graphql
    addMedia(mediaInput:MediaInput!):ID
    updateMedia(mediaUpdate:MediaUpdate!):Int
    removeMedia(id:ID!):Int
`
