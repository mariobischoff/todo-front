import { axiosInstance } from '../boot/axios'

const doRequest = (payload) => {
  const urlRequest = {
    method: '',
    url: payload.URL,
    data: {}
  }
  switch (payload.ACTION) {
    case 'save':
      if (payload.ID) {
        urlRequest.method = 'put'
        urlRequest.data = payload.DATA
        urlRequest.url = payload.URL + '/' + payload.ID
      } else {
        urlRequest.method = 'post'
        urlRequest.data = payload.DATA
      }
      break
    case 'get':
      urlRequest.method = 'get'
      if (payload.ID) {
        urlRequest.URL = payload.URL + '/' + payload.ID
      } else {
        urlRequest.URL = payload.URL
      }
      break
    case 'delete':
      urlRequest.method = 'delete'
      urlRequest.URL = payload.URL + '/' + payload.ID
      break
  }
  return urlRequest
}

export const apiRequest = (payload) => {
  return axiosInstance(doRequest(payload))
    .then(response => response.data)
}
