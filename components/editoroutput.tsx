'use client'

import CustomCodeRenderer from '@/components/renderers/customcoderenderer'
import CustomImageRenderer from '@/components/renderers/customimagerenderer'

import { FC } from 'react'
import dynamic from 'next/dynamic'
import CustomLinkRenderer from './renderers/customlinkrenderer'

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,

}

const style = {
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },
  link:{
    width:"100px"
  }
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (

    <Output
      style={style}
      className='text-sm'
      renderers={renderers}
      data={content}
    />
  )
}

export default EditorOutput