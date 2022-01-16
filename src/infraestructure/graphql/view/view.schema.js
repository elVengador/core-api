export const viewSchema = `#graphql
    type View {
        _id:ID
        name: String!,
        description: String!,
        icon: String!
    }

    input ViewInput{
        name: String!,
        description: String!,
        icon: String!
    }

    # input ViewUpdate{
    #     id:ID!
    #     name: String!,
    #     description: String!,
    #     icon: String!
    # }
`

export const viewQuery = `#graphql
    getView(id:ID!): View
`

export const viewMutation = `#graphql
    addView(viewInput:ViewInput!):ID
    # updateMedia(mediaUpdate:MediaUpdate!):Int
    # removeMedia(id:ID!):Int
`