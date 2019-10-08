import {postRequest, jsonRequest, getRequest} from '@/utils/api'

export function fetchList (params) {
  return postRequest('/user/list', params)
}

export function saveUser (params) {
  return jsonRequest('/user/save', params)
}

export function updateUser (params) {
  return jsonRequest('/user/update', params)
}

export function getUser (id) {
  return getRequest('/user/get/' + id)
}

export function delUser (id) {
  return getRequest('/user/del/' + id)
}
