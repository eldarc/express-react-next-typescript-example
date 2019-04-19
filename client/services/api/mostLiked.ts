import axios from 'axios'

export async function fetchMostLiked() {
  try {
    const result = await axios.get('@api-v1/most-liked')
    return result.data
  } catch (err) {
    throw err
  }
}
