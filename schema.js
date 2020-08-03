const graphql = require ('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt,GraphQLList } = graphql

const posts = [
    {
      title: 'First graphQL project',
      description: 'Created express graphQL server',
      author: 'Mulubwa'
    },
    {
      title: 'Testing APIs',
      description: 'CRUD operations',
      author: 'Mulubwa'
    }
  ]
  
  const authors = {
    'Mulubwa': {
      name: 'Mulubwa',
      age: 27
    }
   
  }
  
  
  const authorType =  new GraphQLObjectType({
    name: 'Author',
    fields: {
      name: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      }
    }
  })
  
  const postType =  new GraphQLObjectType({
    name: 'Post',
    fields: {
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      author: {
        type: authorType,
        resolve: (source, params) => {
          return authors[source.author]
        }
      }
    }
  })
  
  const queryType =  new GraphQLObjectType({
    name: 'Query',
    fields: {
      post: {
        type: postType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (source, {id}) => {
          return posts[id]
        }
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: () => {
          return posts
        }
      }
    }
  })

const schema = new GraphQLSchema({
    query: queryType
  })
  
  module.exports = schema