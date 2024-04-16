import { BookData } from '@/types/books'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiUrl = 'https://335a-5-189-43-226.ngrok-free.app/book'
const fetcher = async (query: string) => {
  if (!query) return []
  try {
    const queryParams = `?query=${query}`
    const res = await axios.get(apiUrl + queryParams)
    return res.data || []
  } catch (e) {
    console.error(e)
  }
}

export function useBookSearch(query: string) {
  const { data, isError, isLoading, refetch } = useQuery<BookData[]>({
    queryKey: ['book', query],
    queryFn: () => fetcher(query),
    enabled: false,
  })

  return {
    data,
    isError,
    isLoading,
    refetch,
  }
}
