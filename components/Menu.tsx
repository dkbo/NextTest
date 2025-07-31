// app/book/page.tsx
import Link from 'next/link'

export default function Menu() {
  return (
    <div className="p-4 bg-black text-gray-300 w-full text-xl shadow-2xl shadow-amber-100 border-b-1 border-solid border-b-gray">
      <div className="w-max-[1280px] m-auto flex">
        <ul className="flex-1 flex gap-16">
          <li>
            <Link href="/">電影列表</Link>
          </li>
          <li>
            <Link href="/ticket/list">訂單列表</Link>
          </li>
          {/* <li>訂票查詢</li> */}
        </ul>
        <div>{/* <Link href="/ticket">線上訂票</Link> */}</div>
      </div>
    </div>
  )
}
