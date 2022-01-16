export const userSchema = `#graphql
    type User {
        _id:ID
        nick: String!
        phone: String!
        email: String!
        password: String!
        name: String!
        paternalLastName: String!
        maternalLastName: String!
        dni: String!
        birthday: String!
        photo: Media!
        state:String!
    }
`

export const userQuery = `#graphql
    # getMedia(id:ID!): Media
`

export const userMutation = `#graphql
    # signUp(signUpInput:SignUpInput!):String
    # signIn(signInInput:SignInInput!):String
`