// app/book/page.tsx
import Link from 'next/link'
// https://copilotstudio.microsoft.com/environments/Default-c0b8e2ad-56b1-4066-bb61-6e83109289fa/bots/crfb5_BlBhhzHK4yl6hge2Ek52J/canvas?__version__=2&enableFileAttachment=true
export default function Menu() {
  return (
    <div className="p-4 bg-black text-gray-300 w-full text-xl shadow-2xl shadow-amber-100">
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
