import Avatar from '@/components/Avatar'
import { ChatGPTLogo, PlusIcon, SendIcon } from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import { useMessageStore } from '@/store/messages'
import Head from 'next/head'
import { useRef } from 'react'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Chat GPT Clone!</title>
      </Head>
      <div className='w-full relative bg-gptgray h-screen'>
        <Aside />
        {children}
      </div>
    </>
  )
}

function Aside() {
  return (
    <aside className='bg-gptdarkgray fixed flex w-64 h-screen flex-col'>
      <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
        <button className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
          <PlusIcon />
          Nuevo Chat
        </button>
      </nav>
    </aside>
  )
}

function UserAvatar() {
  return (
    <img
      src='https://somoskudasai.com/wp-content/uploads/2022/11/portada_bocchi-the-rock-8.jpg'
      alt='foto bochi'
    />
  )
}

function Messsage({ ia, message }) {
  const avatar = ia ? <ChatGPTLogo /> : <UserAvatar />
  const textElement = ia ? <TypingEffect text={message} /> : message
  return (
    <div className={`text-gray-100 ${ia ? 'bg-gptlightgray' : 'bg-gptgray'}`}>
      <article className='flex gap-6 p-4 m-auto max-w-3xl'>
        <Avatar>{avatar}</Avatar>
        <div className='min-h-[20px] flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
          <div className='prose-invert w-full break-words'>
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

function Chat() {
  const messages = useMessageStore((state) => state.messages)

  return (
    <div className='flex flex-col h-full flex-1 pl-64'>
      <main>
        {messages.map((message) => (
          <Messsage key={message.id} {...message} />
        ))}
      </main>
      <ChatForm />
    </div>
  )
}

function ChatForm() {
  const sendPrompt = useMessageStore((state) => state.sendPrompt)
  const textAreaRef = useRef()

  const handleSubmit = (event) => {
    event?.preventDefault()
    const { value } = textAreaRef.current
    console.log({ value })
    sendPrompt({ prompt: value })
    textAreaRef.current.value = ''
  }

  const handleChange = () => {
    const el = textAreaRef.current

    el.style.height = '0px'
    const scrollHeight = el.scrollHeight
    el.style.height = scrollHeight + 'px'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }
  return (
    <section className='absolute bottom-0 w-full left-0 right-0 ml-32'>
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className='flex flex-row max-w-3xl pt-6 m-auto mb-6'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            onChange={handleChange}
            className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none'
          />
          <button
            type='submit'
            className='absolute p-1 rounded-md bottom-2.5 right-2.5'
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}
