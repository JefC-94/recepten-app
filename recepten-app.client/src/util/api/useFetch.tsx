import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Tried with custom fetch hook: deprecated
//Replaced with useSWR
export const useFetch = <R extends any = any>(url: string) => {
  const [data, setData] = useState<R | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  const refetch = async (checkActive: any = () => true) => {
    if (!url) return false
    if (url.slice(-4) === 'null') {
      return false
    }
    setLoading(true)
    setData(null)
    setError(null)
    try {
      const request = await axios.get(`http://localhost:7555/${url}`)
      setLoading(false)
      checkActive && setData(request.data)
    } catch (err: any) {
      setLoading(false)
      setData(null)
      setError(err)
    }
  }

  useEffect(() => {
    let active: boolean = false
    const checkActive = () => active
    refetch(checkActive)

    return () => {
      active = false
    }
  }, [url])

  return { data, loading, error, refetch }
}

export const fetchPost = async (url: string, body: any) => {
  if (!url || !body) {
    return false
  }
  try {
    const request = await axios.post(url, body)
    if (request.data) {
      return request.data[0]
    } else {
      return null
    }
  } catch (err: any) {
    console.log(err)
    return null
  }
}
