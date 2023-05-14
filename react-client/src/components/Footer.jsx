export default function Footer() {
  return (
    <div className='sticky bottom-0 flex items-center justify-between px-4 md:px-20 py-3 bg-white border-t border-gray-300'>
      <div className='flex gap-2 text-sm md:text-base font-light tracking-tighter truncate'>
        <p className="truncate">© 2023 Airbnb, Inc.</p>
        <span>&middot;</span><a href="#" className="hover:underline truncate">Terms</a>
        <span>&middot;</span><a href="#" className="hover:underline truncate">Sitemap</a>
        <span>&middot;</span><a href="#" className="hover:underline truncate">Privacy</a>
        <span>&middot;</span><a href="#" className="hover:underline truncate">Your Privacy Choices</a>
        <span>&middot;</span><a href="#" className="hover:underline truncate">Destinations</a>
      </div>

      <div className='flex items-center gap-3 font-semibold text-sm md:text-md truncate'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 truncate cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <p className="tracking-tight hover:underline truncate cursor-pointer">English (US)</p>
        <p className="tracking-tight truncate cursor-pointer">$&nbsp; <span className="hover:underline truncate">USD</span></p>
        <p className="tracking-tight hover:underline truncate cursor-pointer">Support & resources</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </div>
    </div>
  )
}
