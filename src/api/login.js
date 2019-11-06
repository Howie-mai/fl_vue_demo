import {postRequest} from '@/utils/api'

export function userLogin (params) {
  return postRequest('/login', params)
}

