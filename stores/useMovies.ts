// stores/useMoviesStore.ts
import { create } from 'zustand'
import { getMovies } from '@/api/movies'
import { MovieType } from '@/types/movies'

interface MoviesState {
  movieList: MovieType[]
  movieObj: Record<string, MovieType>
  loading: boolean
  setMovieList: (data: MovieType[]) => void
  getFetch: () => Promise<void>
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  movieList: [],
  movieObj: {},
  loading: false,
  setMovieList: (data) => {
    const movieObj = data.reduce<Record<string, MovieType>>((obj, data) => {
      obj[data.id] = data
      return obj
    }, {})
    set({
      movieList: data,
      movieObj,
    })
  },
  getFetch: async () => {
    set({ loading: true })
    try {
      const res = await getMovies()
      get().setMovieList(res?.data || [])
    } catch (err) {
      console.error('取得電影列表失敗', err)
    } finally {
      set({ loading: false })
    }
  },
}))
