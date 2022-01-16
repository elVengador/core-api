export const permissionSchema = `#graphql
    type Permission {
        _id:ID
        name: String!,
        description: String!,
        state: String!
    }

    input PermissionInput{
        name: String!,
        description: String!
    }
`
export const permissionQuery = `#graphql
    getPermission(id:ID!): Permission
`

export const permissionMutation = `#graphql
    addPermission(permissionInput:PermissionInput!):ID
`
