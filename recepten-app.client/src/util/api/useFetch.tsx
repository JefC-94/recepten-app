import { useState, useEffect } from 'react'
import axios from 'axios'
import { Response } from '../../types'

const CACHE: any = {}

export const useFetch = <R extends any = any>(url: string) => {
  const [data, setData] = useState<R | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)

  //make this a useCallback?
  const refetch = async (checkActive: any = () => true) => {
    if (!url || url.slice(-4) === 'null') return false

    if (CACHE[url] !== undefined) {
      setData(CACHE[url])
      setLoading(false)
    } else {
      setLoading(true)
    }

    try {
      const request = await axios.get(`http://localhost:7555/${url}`)
      if (checkActive) {
        CACHE[url] = request.data
        setData(request.data)
      }
      setError(false)
      setLoading(false)
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

export const fetchPost = async (url: string, body: any): Promise<Response> => {
  if (!url || !body) {
    return { success: 0, message: 'incorrect request parameters' }
  }
  try {
    const request = await axios.post(`http://localhost:7555/${url}`, body)
    return { success: 1, message: request.data[0] }
  } catch (err: any) {
    return { success: 0, message: err.message }
  }
}

export const fetchDelete = async (url: string, id: number): Promise<Response> => {
  if (!url || !id) {
    return { success: 0, message: 'incorrect request parameters' }
  }
  try {
    const request = await axios.delete(`http://localhost:7555/${url}/${id}`)
    return { success: 1, message: request.data[0] }
  } catch (err: any) {
    return { success: 0, message: err.message }
  }
}
