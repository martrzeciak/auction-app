'use client'

import { Pagination } from 'flowbite-react'

type Prop = {
    currentPage: number
    pageCount: number
    pageChanged: (page: number) => void
}

export default function AppPagination({currentPage, pageCount, pageChanged}: Prop) {
  return (
    <Pagination 
        currentPage={currentPage}
        onPageChange={e => pageChanged(e)}
        totalPages={pageCount}
        layout='pagination'
        showIcons={true}
        className='text-blue-500 mb-5'
    />
  )
}
