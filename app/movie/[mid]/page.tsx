import { getMovieTime, getMovies } from '@/api/movies'
import { notFound } from 'next/navigation'

import Movie from './Movie'

interface Params {
  mid: string
}

export default async function Page({ params }: { params: Promise<Params> }) {
  console.log('時刻表', await params)
  const { mid } = await params
  const query = {
    number_of_guests: 1,
    movie_id: +mid,
    date: '',
  }
  const [resData2, resData] = await Promise.all([getMovieTime(query), getMovies()])
  const movieList = resData?.data
  const movieTimeList = resData2?.data
  // 防呆：找不到資料就跳 404 頁
  if (!movieTimeList) return notFound()

  return (
    <div className="bg-blue-950 min-h-[calc(100vh-61px)]">
      <Movie movieTimeList={movieTimeList} movieList={movieList} />
    </div>
  )
}
