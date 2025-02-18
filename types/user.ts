import axiosInstance from '@/lib/axios'
import useSWR from 'swr'

export function useUser () {
  const fetcher = (url: string) => axiosInstance(url).then((r) => r.data?.data)
  const { data, error, isLoading } = useSWR(`/auth/user`, fetcher)

  return {
    user: data,
    isLoading,
    isError: error
  }
}