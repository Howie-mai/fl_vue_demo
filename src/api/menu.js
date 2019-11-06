import {postRequest} from '@/utils/api'

export function getHrMenu (params) {
  return postRequest('/menu/hrMenu', params)
}

