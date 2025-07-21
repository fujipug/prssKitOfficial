import { useEffect, useRef, useState } from 'react'

export default function SoundCloudEmbed({ url, width = '100%', height = '352' }: { url: string; width?: string; height?: string }) {
  const [embedHtml, setEmbedHtml] = useState('')
  const embedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        const response = await fetch(
          `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json&maxheight=${height}`
        )
        const data = await response.json()
        setEmbedHtml(data.html)
      } catch (error) {
        console.error('Error fetching SoundCloud embed:', error)
      }
    }

    fetchEmbed()
  }, [url, height])

  useEffect(() => {
    if (embedHtml && embedRef.current) {
      // Parse the HTML string to extract the iframe src
      const parser = new DOMParser()
      const doc = parser.parseFromString(embedHtml, 'text/html')
      const iframe = doc.querySelector('iframe')

      if (iframe) {
        // Clear the container and append the iframe
        embedRef.current.innerHTML = ''
        embedRef.current.appendChild(iframe)
      }
    }
  }, [embedHtml])

  return <div className='rounded-2xl' ref={embedRef} style={{ width }} />
}