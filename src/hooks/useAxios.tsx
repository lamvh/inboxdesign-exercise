import { useState, useEffect } from "react"
import axios from "axios"
import type { TGetTodosResponse } from "../types"

axios.defaults.baseURL = "https://dummyjson.com/todos"

const useAxios = ({
  url,
  method,
  body = null,
  headers = null,
}: {
  url: string
  method: "get" | "post" | "put" | "delete"
  body?: string | null
  headers?: string | null
}) => {
  const [response, setResponse] = useState<TGetTodosResponse | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    axios[method](
      url,
      headers ? JSON.parse(headers) : null,
      body ? JSON.parse(body) : null
    )
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, body, headers])

  return { response, error, loading }
}

export default useAxios
