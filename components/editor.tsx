'use client'

import EditorJS from '@editorjs/editorjs';
import { FC, useCallback, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { PostValidator } from '@/lib/validators/post'
import {useForm} from 'react-hook-form';
import "@/styles/editor.css";
import { z } from 'zod';

type formData = z.infer<typeof PostValidator>

const editor: FC = () => {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver: zodResolver(PostValidator),
    defaultValues:{
      title:'',
      problemDetail:null,
      triedMethods:null,
      tags:''
    }
  });

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>();
  const initializeEditor = useCallback(async ()=>{
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Code = (await import("@editorjs/code")).default
    const linkTool = (await import("@editorjs/link")).default
    const imageTool = (await import("@editorjs/image")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const InlineCode = (await import("@editorjs/inline-code"))
    if(!ref.current){
      const editor = new EditorJS({
        holder:'editor',
        onReady(){
          ref.current = editor
        },
        placeholder: 'problem detail...',
        inlineToolbar: true,
        data:{blocks:[]},
        tools:{
          header:Header,
          linkTool:{
            class: linkTool,
            config:{
              endpoint:'/api/link'
            }
          },
          image:{
            class:imageTool,
            config:{
              updloader:{

              }
            }
          },
          list:List,
          code:Code,
          inlineCode: InlineCode,
          table:Table,
          embed:Embed,
        },
      })
    }

  },[])
  return (
    <div id='editor' className='min-h-500'/>
  )
}

export default editor