import axios from 'axios'

export async function fetchUser(userId: string) {
  try {
    const result = await axios.get(`@api-v1/user/${userId}`)
    return result.data
  } catch (err) {
    throw err
  }
}

export async function likeUser(userId: string) {
  try {
    const result = await axios.put(`@api-v1/user/${userId}/like`)
    return result.data
  } catch (err) {
    throw err
  }
}

export async function unlikeUser(userId: string) {
  try {
    const result = await axios.put(`@api-v1/user/${userId}/unlike`)
    return result.data
  } catch (err) {
    throw err
  }
}
