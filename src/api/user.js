import {postRequest} from '@/utils/api'

export function fetchList (url, params) {
  return postRequest('http://localhost:8088/user/list', params)
}
