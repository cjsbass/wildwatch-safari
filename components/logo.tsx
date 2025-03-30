import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-safari-leaf">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M8 22h8" />
            <path d="M12 11v11" />
            <path d="M7 10a5 5 0 0 1 5-5c2.76 0 5 2.24 5 5a5 5 0 0 1-5 5" />
            <path d="M20 18a8 8 0 0 0-16 0" />
          </svg>
        </div>
      </div>
      <span className="text-xl font-bold">WildWatch</span>
    </Link>
  )
}

