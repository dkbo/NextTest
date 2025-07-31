'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format, addDays } from 'date-fns'
import { cn } from '@/lib/utils'
import { useMovieTimeStore } from '@/stores/useMovieTime'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function DateSelector() {
  const { getMovieTime, setEmptyMovieTimeList } = useMovieTimeStore()
  const { mid = 1 } = useParams()
  const [open, setOpen] = useState(false) // 控制 popover 開合
  const [date, setDate] = useState<Date | undefined>(new Date()) // 控制 popover 開合
  const handleSelect = (date: Date | undefined) => {
    setDate(date)
    setOpen(false)
    !Array.isArray(mid) && getMovieTime(mid, date ?? new Date())
  }
  useEffect(() => () => setEmptyMovieTimeList(), [setEmptyMovieTimeList])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'border px-4 py-2 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all'
          )}
        >
          {date ? format(date, 'yyyy/MM/dd') : ''}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={{
            before: new Date(),
            after: addDays(new Date(), 30),
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
