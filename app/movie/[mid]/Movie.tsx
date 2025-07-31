'use client'
import { MovieType } from '@/types/movies'
import { MovieTimeType } from '@/types/movieTime'
import Image from 'next/image'
import qs from 'qs'
import styles from '@/styles/MovieTitle.module.css'
import DateSelector from './DateSelector'
import { useEffect, useMemo } from 'react'
import { useMoviesStore } from '@/stores/useMovies'
import { useMovieTimeStore } from '@/stores/useMovieTime'
import { useParams, useRouter } from 'next/navigation'

type MovieProps = {
  movieList: MovieType[]
  movieTimeList: MovieTimeType[]
}

export default function Movie(props: MovieProps) {
  console.log('電影時刻', props)
  const { movieList } = props
  const { mid = '2' } = useParams()
  const { setMovieList } = useMoviesStore()
  const { movieTimeList } = useMovieTimeStore()
  const router = useRouter()
  const data = useMemo(() => movieList.find((data) => +data.id === +mid), [movieList, mid])
  // const timeList = useMovieTimeStore.getState().movieTimeList
  const timeList = useMemo(() => {
    return movieTimeList.length ? movieTimeList : props.movieTimeList
  }, [movieTimeList, props])
  const timeKey = useMemo(() => {
    return timeList.reduce<Record<string, MovieTimeType>>((obj, data) => {
      const key = data.reservation_time?.split(' ')[1].replace(':00', '') ?? ''
      key && (obj[key] = data)
      return obj
    }, {})
  }, [timeList])

  const timeDomArr = useMemo(
    () =>
      Array(12)
        .fill(0)
        .map((_, i) => `${(i * 2).toString().padStart(2, '0')}:00`),
    []
  )
  useEffect(() => {
    setMovieList(movieList)
  }, [setMovieList, movieList])

  const getEndTime = (time: string) =>
    time
      .split(':')
      .map((v, i) => (i ? +v + 50 : (+v + 1).toString().padStart(2, '0')))
      .join(':')

  const goToTicketing = (time: string) => {
    const query = {
      movie_name: data?.name,
      reservation_time: time,
      number_of_guests: 1,
    }
    const queryString = qs.stringify(query)
    router.push(`/ticket?${queryString}`)
  }
  return (
    <div className={styles.movies}>
      <div data-card-top>
        <div data-title> {data?.name}</div>
        <DateSelector />
      </div>
      <div data-card>
        <figure>
          <Image src={data?.image || ''} fill alt={data?.name || '電影海報'} priority />
        </figure>
        <div data-card-body>
          <div data-boxs>
            {timeDomArr.map((time) => (
              <div
                key={time}
                onClick={() => goToTicketing(timeKey[time].reservation_time)}
                data-box
                {...(!timeKey[time] ? { 'data-box-full': true } : {})}
              >
                <div data-box-text>{timeKey[time] ? `${timeKey[time].amount} 席` : '額滿'}</div>
                <div data-box-time>
                  {time}~{getEndTime(time)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
