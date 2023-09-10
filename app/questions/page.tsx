import { FC } from 'react'
import Link from 'next/link';
import Questions from '@/components/questions';

const page: FC = () => {
  return (
    <div className='flex flex-row'>
    <div className='w-[153px] h-[100vh] border-r-2 text-zinc-500 '>
        <div className='active:bg-slate-200 py-2 mt-4'>
            <Link href="/">Home</Link>
        </div>
        <div>
            <div className='mt-1'>
                <h6 className=''>Public</h6>
            </div>
            <div className='ml-4 flex flex-col gap-2 py-3'>
                <Link href="/questions" className='active:bg-zinc-200'>Questions</Link>
                <Link href="/tags">Tags</Link>
                <Link href="/users">Users</Link>
            </div>
        </div>
    </div>
    <Questions questionType='all'/>
    </div>
  )
}

export default page