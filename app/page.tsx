import ContentForm from '@/components/content-form'

export default function Home() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Write a blog</h1>

        <ContentForm />
      </div>
    </section>
  )
}
