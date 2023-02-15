function Avatar({ children }) {
  return (
    <figure className='w-[30px] h-[30px] flex items-center justify-center rounded-sm'>
      {children}
    </figure>
  )
}

export default Avatar
