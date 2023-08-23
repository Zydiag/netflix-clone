import useSwr from 'swr'
import fetcher from "@/lib/fetcher"

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher)

  console.log(data, 'data');
  return {
    data,
    error,
    isLoading,
    mutate
  }
}