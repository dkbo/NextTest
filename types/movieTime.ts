// types/movie.ts
import { RequestParams } from '@/types/axios'

export interface MovieTimeType {
  reservation_time: string
  amount: number
}

export interface MovieTimeResType {
  data: MovieTimeType[]
}

export interface GetMovieTimeData extends RequestParams {
  date: string
  number_of_guests: number
  movie_id?: number
  movie_name?: string
}
