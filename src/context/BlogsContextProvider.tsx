import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { BASE_API_ROUTE } from '../configs/constants'
import { BlogType, BlogUploadType } from '../configs/customTypes'
import {
  NotificationErrorTheme,
  NotificationSuccessTheme,
} from '../themes/NotificationThemes'

export type BlogsContextType = {
  blogs: BlogType[] | null
  setBlogs: React.Dispatch<React.SetStateAction<BlogType[] | null>>
  deleteBlog: (blog_slug: string) => void
  editBlog: (b1: BlogUploadType) => void
  getBlogBySlug: (blog_slug: string) => BlogType | void
  addBlog: (b1: BlogUploadType) => void
}
export const BlogsContext = createContext<BlogsContextType | null>(null)
type PackagesContextProviderProps = {
  children: React.ReactNode
}

const BlogsContextProvider = ({ children }: PackagesContextProviderProps) => {
  const [blogs, setBlogs] = useState<BlogType[] | null>(null)

  useEffect(() => {
    axios
      .get(`${BASE_API_ROUTE}/blogs/`)
      .then((res) => {
        console.log(res.data)
        setBlogs(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  const getBlogBySlug = (blog_slug: string) => {
    if (blogs) {
      const blog1 = blogs.find((p1) => p1.slug === blog_slug)
      return blog1
    } else {
      return
    }
  }
  const editBlog = (b1: BlogUploadType) => {
    console.log(b1)
    axios
      .put(`${BASE_API_ROUTE}/blogs/${b1.slug}/`, b1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        showNotification({
          title: 'Successfull',
          message: 'Blog edited successfully',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
        if (blogs) {
          setBlogs([...blogs.filter((p) => p.slug !== b1.slug), res.data])
        }
      })
      .catch((err) => {
        console.log(err)

        showNotification({
          title: 'Error',
          message: `Error editing the blog`,
          styles: (theme) => NotificationErrorTheme(theme),
        })
      })
  }

  const addBlog = (b1: BlogUploadType) => {
    console.log(b1)
    axios
      .post(`${BASE_API_ROUTE}/blogs/`, b1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        showNotification({
          title: 'Successfull',
          message: 'Blog added successfully',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
        if (blogs) {
          setBlogs([...blogs, res.data])
        }
      })
      .catch((err) => {
        console.log(err)
        let error_message = ''
        const error_response = err.response.data
        if (error_response) {
          if (error_response.slug) {
            error_message = error_response.slug
          }
        } else {
          error_message = 'Error adding the blog'
        }
        showNotification({
          title: 'Error',
          message: error_message,
          autoClose: 10000,
          styles: (theme) => NotificationErrorTheme(theme),
        })
      })
  }

  const deleteBlog = (blog_slug: string) => {
    axios
      .delete(`${BASE_API_ROUTE}/blogs/${blog_slug}/`)
      .then((res) => {
        showNotification({
          title: 'Successfull',
          message: 'Blog deleted successfully',
          styles: (theme) => NotificationSuccessTheme(theme),
        })
        if (blogs) {
          setBlogs(blogs?.filter((p1) => p1.slug !== blog_slug))
        }
      })
      .catch((err) =>
        showNotification({
          title: 'Error',
          message: `Couldn't delete blog.`,
          styles: (theme) => NotificationErrorTheme(theme),
        })
      )
  }

  const context = {
    blogs,
    setBlogs,
    getBlogBySlug,
    addBlog,
    deleteBlog,
    editBlog,
  }

  return (
    <BlogsContext.Provider value={context}>{children}</BlogsContext.Provider>
  )
}

export default BlogsContextProvider
