'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  people: z.number().min(1).max(10),
  datetime: z.date(),
})

type FormData = z.infer<typeof formSchema>

export default function ReservationForm() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const selectedDate = watch("datetime")
  const [open, setOpen] = useState(false)

  const onSubmit = (data: FormData) => {
    alert(`已訂位：${data.people} 人，時間：${data.datetime.toLocaleString()}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">📅 線上訂位</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 人數選擇 */}
            <div className="space-y-2">
              <Label htmlFor="people">人數</Label>
              <select
                id="people"
                {...register("people", { valueAsNumber: true })}
                defaultValue={1}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} 人</option>
                ))}
              </select>
              {errors.people && <p className="text-sm text-red-500">請選擇人數</p>}
            </div>

            {/* 時間選擇 */}
            <div className="space-y-2">
              <Label>時間</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "yyyy/MM/dd HH:mm") : "選擇時間"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) setValue("datetime", date)
                      setOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.datetime && <p className="text-sm text-red-500">請選擇時間</p>}
            </div>

            {/* 提交按鈕 */}
            <Button type="submit" className="w-full text-base py-2 rounded-xl">✅ 確認訂位</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
