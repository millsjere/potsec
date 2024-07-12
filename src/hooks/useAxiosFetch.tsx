import { useEffect, useState } from 'react'
import { base } from '../config/appConfig'


interface Props {
    url: string
    method: 'GET' | 'POST'
    payload?: Object 
}

const useAxiosFetch = ({ url, method, payload }:Props) => {
    const [response, setResponse] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchData = async() => {
        try {
            setIsLoading(true)
            const { data: res } = method === 'GET' ? await base.get(url) : await base.post(url, payload)
            setResponse(res)
        } catch (error: any) {
            setError(error?.response)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    {
        response, error, isLoading
    }
  )
}

export default useAxiosFetch