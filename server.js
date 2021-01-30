const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,OPTIONS,DELETE'
}))
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true // 查询工具
}))
app.listen(4000, () => {
  console.log('服务器启动：http://localhost:4000')
})