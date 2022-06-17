import React, { useEffect, useState } from 'react'
import textfile from '../../assets/test.txt'

import './RenderText.css';
import { HighlightedProp } from './types';

export const RenderText = () => {
  const [text, setText] = useState('')
  const [searchString, setSearchString] = useState<null | string>(null)
  
  useEffect(() => {
    const fetchText = async () => {
      const res = await fetch(textfile)
      const text = await res.text()
      setText(text)
    }
    fetchText()
  }, [])



  const Highlighted = ({ text = '' }: HighlightedProp) => {

    const regex = new RegExp(`(${searchString})`, 'gi')
    const parts = text.split(regex)
    return (
      <div className='text'>
        {parts.filter(part => part).map((part, i) => (
          regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
        ))}
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const replacedText = searchString?.split('').reduce((prev, curr) => {
      return prev + 'X'
    }, '')
    const regex = new RegExp(`(${searchString})` || "", "gi");
    const newText = text.replaceAll(regex, replacedText || "")
    setText(newText)
    setSearchString(null)
  }

  return (
    <div className='container'>
      <div className='item search-string-input'>
        <form onSubmit={handleSubmit}>
          <label>Search Keyword</label>
          <input placeholder='Search keywords to replace' type='text' value={searchString || ""} onChange={(e) => setSearchString(e.target.value || null)} />
          <button type='submit' >Replace</button>
        </form>
      </div>
      <div className='item'>
        <h1>Test Template Marco's Resume</h1>
        <Highlighted text={text} />
      </div>
    </div>
  )
}
