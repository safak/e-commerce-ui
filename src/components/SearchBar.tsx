import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className={'hidden sm:flex items-center gap-2 rounded-sm ring-1 ring-gray-600 px-2 py-1 shadow-2xs'}>
      <Search className={'w-4 h-4 text-gray-600'} />
      <input type={'text'} id="serach" placeholder={'Search...'} className={'outline-0 text-sm'}/>
    </div>
  )
}

export default SearchBar
