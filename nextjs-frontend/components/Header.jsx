import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header() {
  const { pathname } = useRouter()

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <Link href="/client-only">
        <a className={pathname === '/client-only' ? 'is-active' : ''}>
          Client-Only
        </a>
      </Link>
      <Link href="/ssr">
        <a className={pathname === '/ssr' ? 'is-active' : ''}>SSR</a>
      </Link>
    </header>
  )
}
