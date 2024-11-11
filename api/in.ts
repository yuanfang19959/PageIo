
import request from '@/utils/request'
const BASEURL = "http://127.0.0.1:7001";
export const getBlogList = async (body: any) => {
  const res = await request(`${BASEURL}/api/?${new URLSearchParams(body as any)}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

export const loginFn = async (payload: any) => {
  const res = await request(`${BASEURL}/api/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}


export const regFn = async (payload: any) => {
  const res = await request(`${BASEURL}/api/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}


export const postBlog = async (payload: any) => {
  const res = await request(`${BASEURL}/api/post`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
  return res.json()
}

export const getBlog = async (body: any) => {
  const res = await request(`${BASEURL}/api/blog/${body.id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}
