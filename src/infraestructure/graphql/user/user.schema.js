const userSchema = `
type User {
    name: String!
    nick: String!
  }

type Query {
    getUser: User
}
`

export { userSchema }