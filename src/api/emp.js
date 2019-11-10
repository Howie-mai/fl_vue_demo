import {getRequest, jsonRequest, postRequest} from '@/utils/api'

export function fetchEmpList(pageNum, pageSize, beginTimeScope, params) {
  return jsonRequest('/emp/list?pageNum=' + pageNum + '&pageSize=' + pageSize + '&beginTimeScope=' + beginTimeScope, params)
}

export function fetchBasicList() {
  return getRequest('/emp/basicData')
}

export function saveEmp(params) {
  return jsonRequest('/emp/save', params)
}

export function getEmp(id) {
  return getRequest('/emp/get/' + id)
}

export function updateEmp(params) {
  return jsonRequest('/emp/update',params)
}

export function delEmp(id) {
  return postRequest('/emp/delete/' + id)
}

export function delEmpList(ids) {
  return jsonRequest('/emp/deleteList/', ids)
}

export function exportExcel() {
  return getRequest('/emp/exportEmp/')
}

