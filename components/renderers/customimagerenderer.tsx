'use client'

import Image from 'next/image'

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='relative w-full min-h-[15rem] m-2'>
      <Image alt='image' className='w-[500px] object-fill' width="500" height="100"  src={src} />
    </div>
  )
}

export default CustomImageRenderer