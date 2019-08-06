import checkAuth from './auth.js'
import { readToken } from './utils.js'

const fetch = require("node-fetch")
const queryString = require("query-string")
const crypto = require('crypto')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { endpoint, configOptions, modules }
) => {
  const { createNode } = actions
  let token = readToken()
  let access_token = await checkAuth(endpoint, configOptions, token)
  for (const module of modules) {
    try {
      let url = `${endpoint}/${module}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        }
      })
      let data = await response.json()
      data.records.forEach(d => {
        let digest = crypto.createHash('md5').update(JSON.stringify(d)).digest('hex')
        let { id, name, fields, ...rest } = d
        let node = {
          id: `${id}`,
          name,
          ...rest,
          formFields: fields,
          children: [],
          parent: null,
          internal: {
            type: `Sugar${module}`,
            contentDigest: digest
          }
        }
        createNode(node)
      })
    } catch(err) {
      console.error(`Error caught while creating node: ${err}`)
    }
  }
}