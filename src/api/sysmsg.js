import {postRequest} from '@/utils/api'

export function fetchMsgList (params) {
  return postRequest('/sysMsg/list', params)
}
