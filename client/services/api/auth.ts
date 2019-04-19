import axios from 'axios'

export function setAuthorizationHeader(token: string | undefined) {
  // Set default authorization header.
  token === undefined ? axios.defaults.headers.common.Authorization = undefined : axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export async function login(username: string, password: string) {
  try {
    const result = await axios.post('@api-v1/auth/login', {
      username,
      password
    })

    return result.data
  } catch (err) {
    throw err
  }
}

export async function signup(username: string, password: string) {
  try {
    const result = await axios.post('@api-v1/auth/signup', {
      username,
      password
    })

    return result.data
  } catch (err) {
    throw err
  }
}
