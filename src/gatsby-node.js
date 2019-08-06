import checkAuth from './auth.js'
import { readToken } from './utils.js'


const queryString = require("query-string")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { endpoint, configOptions }
) => {
  const { createNode } = actions
  // Gatsby expects sourceNodes to return a promise
  let token = readToken()
  console.log(token)
  let result = await checkAuth(endpoint, configOptions, token)
  console.log('Response from checkAuth: ')
  console.log(result)
  return (
    console.log(readToken())
  )
}