'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useTickerStore } from '@/stores/useTicket'
import { TicketType } from '@/types/ticket'

type MovieProps2 = {
  id: number | string
  name: string
  image: string
}

type MovieProps = {
  movieList: MovieProps2[]
  movieReservations: TicketType[]
}

export default function VirtualMovieOrderTable(props: MovieProps) {
  const { deleteMovieReservations, movieReservations: list } = useTickerStore()
  const tableRef = useRef<HTMLDivElement>(null)
  const { movieReservations } = props
  const listData = useMemo(
    () => (list.length ? list : movieReservations),
    [list, movieReservations]
  )
  useEffect(() => {
    useTickerStore.setState({ movieReservations })
  }, [movieReservations])

  const rowVirtualizer = useVirtualizer({
    count: listData.length,
    getScrollElement: () => tableRef.current,
    estimateSize: () => 53,
    overscan: 10,
  })

  const cancelReservation = (id: number) => {
    deleteMovieReservations(id)
  }

  return (
    <div ref={tableRef} className="h-[calc(100vh-61px)] overflow-auto border rounded-md">
      {/* Header */}
      <div className="grid grid-cols-[2fr_2fr_1fr_2fr_auto] font-semibold bg-gray-100 py-4 px-4 sticky top-0 z-10 border-b text-sm">
        <div>電影名稱</div>
        <div>電影開始時間</div>
        <div>人數</div>
        <div>建立時間</div>
        <div className="text-center">操作</div>
      </div>

      {/* Body */}
      <div className="relative " style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const order = listData[virtualRow.index]
          return (
            <div
              key={order.id}
              className="grid grid-cols-[2fr_2fr_1fr_2fr_auto] py-4 px-4 border-b absolute top-0 left-0 w-full items-center text-sm"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div>{order.movie.name}</div>
              <div>{order.reservation_time}</div>
              <div>{order.number_of_guests}</div>
              <div>{new Date(order.created_at).toLocaleString()}</div>
              <div>
                <button
                  onClick={() => cancelReservation(order.id)}
                  className="text-red-600 hover:underline"
                >
                  取消
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
