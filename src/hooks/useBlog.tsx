import { useContext } from 'react'
import { BlogsContext } from '../context/BlogsContextProvider'

export const useBlog = () => {
  const context = useContext(BlogsContext)
  if (!context) {
    throw new Error('must be inside provider')
  }
  const { blogs, setBlogs, editBlog, getBlogBySlug, deleteBlog, addBlog } =
    context

  return {
    blogs,
    setBlogs,
    editBlog,
    getBlogBySlug,
    deleteBlog,
    addBlog,
  }
}
