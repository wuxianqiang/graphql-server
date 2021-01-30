const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

// 先定义产品类型
const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const categories = [
  { id: '1', name: '图书' },
  { id: '2', name: '图书2' },
  { id: '3', name: '图书3' },
  { id: '4', name: '图书4' },
]

// 定义根类型，有query,mutation等等
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getCategory: {
      type: Category,
      args: {
        id: { type: GraphQLString },
      },
      resolve (parent, args) {
        return categories.find((item) => item.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})