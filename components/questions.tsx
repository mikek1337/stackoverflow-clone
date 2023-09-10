import { FC } from 'react'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface questionsProps {
  questionType:string,
}

const Questions: FC<questionsProps> = ({questionType, ...props}) => {
  return (
    <div className='container'>
        <div className='flex flex-row justify-between py-5'>
            <h1 className='text-4xl'>All Questions</h1>
            <Link className={cn(buttonVariants({variant:'default'}), 'w-[200px]')} href="/questions/ask">Ask Question</Link>
        </div>
    </div>
  )
}

export default Questions