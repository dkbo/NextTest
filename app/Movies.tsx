'use client'
import { MovieType } from '@/types/movies'
import styles from '@/styles/App.module.css'
import { useMoviesStore } from '@/stores/useMovies'
// import { getMovies } from '@/api/movies'
import Movie from './Movie'
import { useEffect } from 'react'

// 定義組件 props 型別
interface MoviesProps {
  movieList: MovieType[]
}

export default function Movies({ movieList = [] }: MoviesProps) {
  const { setMovieList } = useMoviesStore()
  useEffect(() => {
    setMovieList(movieList)
  }, [setMovieList, movieList])
  return (
    <div className={styles.movies}>
      {movieList.map((data: MovieType) => (
        <Movie key={data.id} {...data} />
      ))}
    </div>
  )
}
