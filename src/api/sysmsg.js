import {postRequest,jsonRequest} from '@/utils/api'

export function fetchMsgList (params) {
  return postRequest('/sysMsg/list', params)
}

export function sendMessage (params) {
  return jsonRequest('/sysMsg/nf', params)
}

export function updateStatus (params) {
  return postRequest('/sysMsg/updateStatus', params)
}
