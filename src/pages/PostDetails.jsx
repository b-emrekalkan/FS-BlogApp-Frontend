import React, { useContext } from 'react'
import { useEffect } from 'react'
import { BlogContext } from '../context/BlogContext'

const PostDetails = () => {
  const {getOneBlog} = useContext(BlogContext)

  useEffect(() => {
    const result = getOneBlog("gezi-97263409c9")
    console.log(result)
  }, [])

  return (
    <div>
      PostDetails
    </div>
  )
}

export default PostDetails