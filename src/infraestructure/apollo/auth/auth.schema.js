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

    input SignOffInput{
        currentRefreshToken:String!
    }

    input RefreshTokenInput{
        currentRefreshToken:String!,
        retryNumber:Int!,
    }

    type TokensOutput{
        accessToken:String,
        refreshToken:String
    }
`

export const authQuery = `#graphql
    # getMedia(id:ID!): Media
    hola:String
`

export const authMutation = `#graphql
    signUp(signUpInput:SignUpInput!):String
    signIn(signInInput:SignInInput!):TokensOutput
    signOff(signOffInput:SignOffInput!):Boolean
    refreshToken(refreshTokenInput:RefreshTokenInput!):TokensOutput
    privateContent:String
`
