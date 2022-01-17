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
        currentRefreshToken:String!
    }

    type TokensOutput{
        accessToken:String,
        refreshToken:String
    }
`

export const authQuery = `#graphql
    # getMedia(id:ID!): Media
`

export const authMutation = `#graphql
    signUp(signUpInput:SignUpInput!):String
    signIn(signInInput:SignInInput!):TokensOutput
    signOff(signOffInput:SignOffInput!):Boolean
    refreshToken(refreshTokenInput:RefreshTokenInput!):TokensOutput
    privateContent:String
`
