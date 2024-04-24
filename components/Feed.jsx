'use client'
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [ allPosts, setAllPosts ] = useState([])
  const [ searchedResults, setSearchedResults ] = useState([])
  const [ searchTimeout, setSearchTimeout ] = useState(null)

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i') // i for case insensitive search
    return allPosts.filter((item) => 
    regex.test(item.creator.username) || 
    regex.test(item.prompt) || 
    regex.test(item.tag))
  }

  const handleSearchChange = (e) => {
      clearTimeout(searchTimeout)
      setSearchText(e.target.value)

      setSearchTimeout(setTimeout(() => {
        const searchResults = filterPrompts(e.target.value)
        setSearchedResults(searchResults)
      }, 500)
    )

  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResults = filterPrompts(tagName)
    setSearchedResults(searchResults)
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setAllPosts(data)
  }

  useEffect(() => {

    fetchPosts()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      {/* all prompts here or searched ones */}
      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList 
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed