'use client'

import { motion } from 'framer-motion'
import { MovieType } from '@/types/movies'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useTickerStore } from '@/stores/useTicket'
import { useMoviesStore } from '@/stores/useMovies'
import { useState, useEffect } from 'react'

// 定義組件 props 型別
interface MoviesProps {
  movieList: MovieType[]
  searchParams: Record<string, string>
}

export default function Form({ movieList, searchParams }: MoviesProps) {
  const { setMovieList } = useMoviesStore()
  useEffect(() => {
    setMovieList(movieList)
    return () => useTickerStore.setState({ alreadyed: false })
  }, [setMovieList, movieList])

  const { postTicket, alreadyed } = useTickerStore()
  const [params, setParams] = useState({
    movie_name: decodeURIComponent(searchParams.movie_name ?? ''),
    reservation_time: decodeURIComponent(searchParams.reservation_time ?? ''),
    number_of_guests: +(searchParams.number_of_guests ?? 1),
  })

  const onSubmit = () => {
    postTicket(params)
  }
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const number_of_guests = +e.target.value
    setParams((prev) => ({
      ...prev,
      number_of_guests,
    }))
  }

  return (
    <div className="flex-1 flex items-center justify-center animated-gradient px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="w-md max-w-md backdrop-blur-md bg-white/60 shadow-2xl border border-white/30 rounded-3xl p-4">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold text-gray-800">
              {params?.movie_name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 人數 */}
              <div className="space-y-2">
                <Label htmlFor="people" className="text-base text-gray-700">
                  人數
                </Label>
                <select
                  id="people"
                  disabled={alreadyed}
                  value={params.number_of_guests}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  onChange={handleChange}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} 人
                    </option>
                  ))}
                </select>
              </div>

              {/* 場次 */}
              <div className="space-y-2">
                <Label htmlFor="place" className="text-base text-gray-700">
                  場次
                </Label>
                {params.reservation_time}
              </div>
              {/* 送出 */}
              <Button
                disabled={alreadyed}
                onClick={onSubmit}
                type="button"
                className="w-full text-base py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 transition text-white font-semibold shadow-md"
              >
                {alreadyed ? '已購買' : '確認買票'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
