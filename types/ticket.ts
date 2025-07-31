// types/ticket.ts
import { RequestData } from '@/types/axios'

export interface TicketType {
  id: number
  movie_id: number
  reservation_time: string
  number_of_guests: number
  created_at: string
  updated_at: string
  movie: {
    name: string
  }
}

export interface TicketResType {
  data: TicketType[]
}

export interface PostTicketData extends RequestData {
  number_of_guests: number
  movie_id: number
  reservation_time: string
}
