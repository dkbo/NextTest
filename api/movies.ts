// api/movies.ts
import { MoviesResType } from '@/types/movies'
import { GetMovieTimeData, MovieTimeResType } from '@/types/movieTime'
import { PostTicketData, TicketResType } from '@/types/ticket'

import axiosServer from '@/lib/axios-server'

// GET /api/movies
export const getMovies = async (): Promise<MoviesResType> => {
  console.log('api', 'getMovies')
  return await axiosServer.get('/movies')
}

// GET /api/reservations/available
export const getMovieTime = async (data: GetMovieTimeData): Promise<MovieTimeResType> => {
  console.log('api', 'getMovieTime')
  return await axiosServer.get('/reservations/available', data)
}

// POST /api/reservations/available
export const postTicket = async (data: PostTicketData) => {
  console.log('api', 'postTicket')
  return await axiosServer.post('/reservations', data)
}
// GET /api/reservations
export const getMovieReservations = async (): Promise<TicketResType> => {
  console.log('api', 'getMovieReservations')
  return await axiosServer.get('/reservations')
}

// GET /api/reservations
export const deleteMovieReservations = async (id: number) => {
  console.log('api', 'deleteMovieReservations')
  return await axiosServer.delete(`/reservations/${id}`)
}
