export const authSchema = `#graphql
    
    input SignUpInput{
        nick:String!,
        email:String!,
        password:String!
    }

    input SignInInput{
        email:String!,
        password:String!
    }

    type SignInOutput{
        accessToken:String,
        refreshToken:String
    }
`

export const authQuery = `#graphql
    # getMedia(id:ID!): Media
`

export const authMutation = `#graphql
    signUp(signUpInput:SignUpInput!):String
    signIn(signInInput:SignInInput!):SignInOutput
`
