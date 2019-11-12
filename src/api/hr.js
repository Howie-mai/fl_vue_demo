import {postRequest} from '@/utils/api'

export function fetchHrList (params) {
  return postRequest('/hr/listHr', params)
}
