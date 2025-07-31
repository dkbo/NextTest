// app/book/page.tsx
import { getMovieReservations } from '@/api/movies'
import Table from './Table'
export default async function TicketPage() {
  const resData = await getMovieReservations()
  const movieReservations = resData?.data

  getMovieReservations
  return <Table movieReservations={movieReservations} />
}

export const dynamic = 'force-dynamic'
