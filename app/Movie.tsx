import Image from 'next/image'
import Link from 'next/link'

type MovieProps = {
  id: number | string
  name: string
  image: string
}

export default function Movie(props: MovieProps) {
  const { id, name, image } = props
  return (
    <div data-movie>
      <Link href={`/movie/${id}`}>
        <figure>
          <Image src={image} alt="" fill />
        </figure>
        <div data-title>{name}</div>
      </Link>
    </div>
  )
}
