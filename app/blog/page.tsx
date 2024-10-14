import Link from 'next/link'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function Blogs() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!posts) {
    return <div>No posts found.</div>
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Blogs</h1>
        <ul className='mt-6 flex flex-col gap-2'>
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
