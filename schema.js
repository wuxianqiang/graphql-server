const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql

const categories = [
  { id: '1', name: '图书' },
  { id: '2', name: '手机' },
  { id: '3', name: '面包' },
  { id: '4', name: '电脑' },
]

// products.category 对应的是 categories.id 表示分类id
const products = [
  { id: '1', name: '红楼梦1', category: '1' },
  { id: '2', name: '红楼梦2', category: '1' },
  { id: '3', name: '华为手机', category: '2' },
  { id: '2', name: 'mac电脑', category: '4' },
]

const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(Product),
      resolve (parent) {
        // parent是当前分类，根据分类找到对应的产品列表
        return products.filter(item => item.category === parent.id)
      }
    }
  })
})

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    category: {
      type: Category,
      resolve (parent) {
        // category: '1' 根据分类的id找到分类对应的对象
        return categories.find(item => item.id === parent.category)
      }
    }
  })
})


// 定义根类型，有query,mutation等等
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    // 根据ID查询分类
    getCategory: {
      type: Category,
      args: {
        id: { type: GraphQLString },
      },
      resolve (parent, args) {
        return categories.find((item) => item.id === args.id)
      }
    },
    // 查询所有分类
    getCategoryList: {
      type: new GraphQLList(Category),
      args: {
      },
      resolve (parent, args) {
        return categories
      }
    },
    // 根据ID查询产品
    getProduct: {
      type: Product,
      args: {
        id: { type: GraphQLString },
      },
      resolve (parent, args) {
        return products.find((item) => item.id === args.id)
      }
    },
    // 查询说有产品
    getProductList: {
      type: new GraphQLList(Product),
      args: {
      },
      resolve (parent, args) {
        return products
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})

 