import { format } from 'date-fns'
// stores/useMoviesStore.ts
import { create } from 'zustand'
import { getMovieTime } from '@/api/movies'
import { MovieTimeType } from '@/types/movieTime'

interface MoviesState {
  movieTimeList: MovieTimeType[]
  loading: boolean
  getMovieTime: (movie_id: string | number, date: Date | string) => Promise<void>
  setEmptyMovieTimeList: () => void
}

export const useMovieTimeStore = create<MoviesState>((set) => ({
  movieTimeList: [],
  loading: false,
  getMovieTime: async (movie_id, date) => {
    set({ loading: true })
    try {
      const res = await getMovieTime({
        date: format(date, 'yyyy-MM-dd'), // yyyy-MM-dd
        number_of_guests: 1,
        movie_id: Number(movie_id), // 避免 string id 混亂
      })
      set({ movieTimeList: res.data, loading: false })
    } catch (err) {
      console.error('撈取場次失敗', err)
      set({ loading: false })
    }
  },
  setEmptyMovieTimeList: () => set({ movieTimeList: [] }),
}))
