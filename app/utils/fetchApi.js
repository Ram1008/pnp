import {getAuthToken} from './getToken.js';



export async function fetchApi(url, { method = 'GET', headers = {}, data = null} = {}) {
  const token = getAuthToken()
  const config = {
    method: method.toUpperCase(),
    headers: { ...headers }
  }

  // Inject Authorization header if token exists
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  // Attach body only if method allows and data is provided
  if (data != null && !['GET', 'HEAD'].includes(config.method)) {
    if (data instanceof FormData) {
      // Let browser set the correct multipart boundary
      config.body = data
    } else {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(data)
    }
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + url, config)

  // Try to parse JSON, fallback to text
  const contentType = res.headers.get('Content-Type') || ''
  if (contentType.includes('application/json')) {
    const json = await res.json()
    if (!res.ok) {
      // Attach status and URL for easier debugging
      const err = new Error(json.message || 'Request failed')
      err.status = res.status
      err.payload = json
      throw err
    }
    return json
  } else {
    const text = await res.text()
    if (!res.ok) {
      const err = new Error(text || 'Request failed')
      err.status = res.status
      throw err
    }
    return text
  }
}
