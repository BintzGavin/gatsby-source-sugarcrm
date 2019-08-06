import { writeToken, readToken } from './utils.js'
const fetch = require("node-fetch")

const createToken = async (endpoint, apiOptions) => {
  apiOptions.grant_type = 'password';
  let response = await fetch(endpoint+'/oauth2/token', {
    method: 'POST',
    body: JSON.stringify(apiOptions),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await response.json()
  writeToken({
    access_token: data.access_token,
    refresh_token: data.refresh_token
  })
  return data.access_token
}
const checkToken = async (endpoint, access_token) => {
  return await fetch(endpoint+'/me/preferences', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    }
  })
}
const refreshToken = async (endpoint, apiOptions, token) => {
  apiOptions.grant_type = 'refresh_token'
  apiOptions.refresh_token = token.refresh_token
  let response = await fetch(endpoint+'/oauth2/token', {
    method: 'POST',
    body: JSON.stringify(apiOptions),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.access_token}`,
    }
  })
  if (response.status === 400) {
    console.log('\nRefresh Token is expired, refreshing authentication')
    return await createToken(endpoint, apiOptions)
  }
  else {
    let data = await response.json()
    if(data.access_token) {
      writeToken({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      })
    }
    return data.access_token
  }
}
const checkAuth = async (endpoint, config, token) => {
  if(token.hasOwnProperty('access_token')) {
    let result = await checkToken(endpoint, token.access_token)
      .catch(error => console.error(error))
    if(result.status === 401) {
      console.log(`\nAccess Token invalid, refreshing token\n`)
      return await refreshToken(endpoint, config, token)
    } else if(result.status === 200) return token.access_token
  } else {
    console.log('\nToken is not present. Fetching a new one...')
    return await createToken(endpoint, config)
      .catch(error => console.error(error))
  }
}

export default checkAuth