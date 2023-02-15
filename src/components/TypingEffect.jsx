import React, { useEffect, useState } from 'react'

export const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!text.length) return

    const randomTime = Math.floor(Math.random() * 20) + 5

    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId)
        setShowCursor(false)
        return
      }

      const nextIndex = text.indexOf(' ', currentIndex + 1)
      if (nextIndex < 0) { // llegar al final del texto
        setDisplayText(text)
        setCurrentIndex(text.length)
        return
      }

      setDisplayText(text.slice(0, nextIndex))
      setCurrentIndex(currentIndex + 1)
    }, randomTime)
    return () => clearInterval(intervalId)
  }, [text, currentIndex])

  return <span>{displayText}</span>
}
