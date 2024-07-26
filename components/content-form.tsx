'use client'

import { useEffect, useState } from 'react'

import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBlogAction } from '@/lib/actions'
import { toast } from 'sonner'

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Type "/" for commands or start writing...'
        }
      ]
    }
  ]
}

export default function ContentForm() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    setSlug(name)
  }, [title])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // TODO: validate the data
    const result = await createBlogAction({ title, slug, content })

    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <form
      className='mt-6 flex max-w-2xl flex-col gap-4'
      onSubmit={handleSubmit}
    >
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          type='text'
          placeholder='Slug'
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
      </div>

      <Editor initialValue={defaultValue} onChange={setContent} />
      <Button type='submit'>Create</Button>
    </form>
  )
}
