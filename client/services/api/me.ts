import axios from 'axios'

export async function me() {
  try {
    const result = await axios.get('@api-v1/me')
    return result.data
  } catch (err) {
    throw err
  }
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  try {
    const result = await axios.patch('@api-v1/me/update-password', {
      currentPassword,
      newPassword
    })
    return result.data
  } catch (err) {
    throw err
  }
}
