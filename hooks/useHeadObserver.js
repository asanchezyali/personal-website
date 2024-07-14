import { useEffect, useState, useRef } from 'react'

function useHeadsObserver() {
  const observer = useRef(null)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -90% 0px',
    })

    let elements = document.querySelectorAll('h1, h2, h3, h4')
    elements.forEach((elem) => {
      if (observer.current) {
        observer.current.observe(elem)
      }
    })

    return () => observer.current && observer.current.disconnect()
  }, [])

  return { activeId }
}

export default useHeadsObserver
