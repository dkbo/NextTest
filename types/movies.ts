// types/movies.ts
export interface MovieType {
  id: number | string
  name: string
  image: string
}

export interface MoviesResType {
  data: MovieType[]
}
