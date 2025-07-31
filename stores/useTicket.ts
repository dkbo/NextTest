// stores/useTicket.ts
import { create } from 'zustand'
import { postTicket, deleteMovieReservations } from '@/api/movies'
import { toast } from 'sonner'
import { TicketType, PostTicketData } from '@/types/ticket'

interface MoviesState {
  movieReservations: TicketType[]
  loading: boolean
  alreadyed: boolean
  postTicket: (data: PostTicketData) => Promise<void>
  deleteMovieReservations: (id: number) => Promise<void>
  removeMovieReservationsIndex: (id: number) => void
}

export const useTickerStore = create<MoviesState>((set, get) => ({
  movieReservations: [],
  loading: false,
  alreadyed: false,
  postTicket: async (data) => {
    set({ loading: true })
    await postTicket(data)
      .then(() => {
        toast.success('買票成功', { description: `人數：${data.number_of_guests} 人` })
        set({ alreadyed: true })
      })
      .catch(() => toast.error('此場次已無售票'))
      .finally(() => set({ loading: false }))
  },
  deleteMovieReservations: async (id) => {
    set({ loading: true })
    await deleteMovieReservations(id)
      .then(() => toast.success('取消成功') && get().removeMovieReservationsIndex(id))
      .catch(() => toast.error('取消失敗'))
      .finally(() => set({ loading: false }))
  },
  removeMovieReservationsIndex(id) {
    set((state) => ({
      movieReservations: state.movieReservations.filter((data) => data.id !== id),
    }))
  },
}))
