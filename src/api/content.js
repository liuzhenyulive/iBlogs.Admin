import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/content/page',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: '/content/status',
    method: 'post',
    data
  })
}

export function deleteContent(data) {
  return request({
    url: '/content/delete',
    method: 'post',
    data
  })
}