// app/book/page.tsx
import { getMovies } from '@/api/movies'
import Form from './Form'
export default async function TicketPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const searchParamsObj = await searchParams
  const resData = await getMovies()
  const movieList = resData?.data || []

  return <Form movieList={movieList} searchParams={searchParamsObj} />
}

export const dynamic = 'force-dynamic'
