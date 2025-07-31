// app/book/page.tsx
import { getMovies, getMovieReservations } from '@/api/movies'
import Table from './Table'
export default async function TicketPage() {
  const [resData2, resData] = await Promise.all([getMovieReservations(), getMovies()])
  const movieList = resData?.data
  const movieReservations = resData2?.data

  getMovieReservations
  return <Table movieList={movieList} movieReservations={movieReservations} />
}
