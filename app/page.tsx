import { getMovies } from '@/api/movies'
import Movies from './Movies'

export default async function Page() {
  const resData = await getMovies()
  const movieList = resData?.data || []

  console.log('首頁')

  return (
    <div className="bg-blue-950 py-8 min-h-[calc(100vh-61px)]">
      {/* <div className="bg-center"></div> */}
      {/* <div className="m-5 text-center text-white text-2xl">電影列表</div> */}
      <Movies movieList={movieList} />
    </div>
  )
}
