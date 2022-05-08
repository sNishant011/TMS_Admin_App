import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Group,
  Image,
  Input,
  InputWrapper,
  NumberInput,
  TextInput,
} from '@mantine/core'
import RichTextEditor from '@mantine/rte'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'tabler-icons-react'
import { BlogType, BlogUploadType } from '../configs/customTypes'
import { useBlog } from '../hooks/useBlog'

const EditBlog = () => {
  const { blogSlug } = useParams()
  const { getBlogBySlug, editBlog } = useBlog()
  const [blogToBeEdited, setBlogToBeEdited] = useState<BlogType | null>(null)
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('N/A')
  const [subtitle, setSubtitle] = useState<string>('N/A')
  const [slug, setSlug] = useState<string>('')
  const [image, setImage] = useState<File | string>('')
  const [is_published, setIs_Published] = useState<boolean>(false)
  const [description, setDescription] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')
  useEffect(() => {
    if (blogSlug) {
      const b1 = getBlogBySlug(blogSlug)
      if (b1) {
        setBlogToBeEdited(b1)
      }
    }
  }, [getBlogBySlug, blogSlug, setBlogToBeEdited])

  useEffect(() => {
    if (blogToBeEdited) {
      setId(blogToBeEdited.id)
      setTitle(blogToBeEdited.title)
      setSlug(blogToBeEdited.slug)
      setSubtitle(blogToBeEdited.subtitle)
      setDescription(blogToBeEdited.description)
      setIs_Published(blogToBeEdited.is_published)
      const image_url = blogToBeEdited.thumbnail_Image
      setPreviewImage(image_url)
    }
  }, [blogToBeEdited])
  if (blogToBeEdited === null) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumbs>
        <Anchor href={`/blogs`}>Blogs</Anchor>
        <Anchor href={`#`}>Edit Blog</Anchor>
        <Anchor href={`#`}>{blogSlug}</Anchor>
      </Breadcrumbs>
      <Box
        sx={{
          maxWidth: 900,
          padding: '0rem 2rem 2rem 1rem',
          overflowY: 'scroll',
          height: '85vh',
          marginLeft: '1rem',
        }}
        mt={`md`}
      >
        <form
          style={{
            width: `100%`,
            display: 'flex',
            flexDirection: 'column',
            gap: `1rem`,
            paddingBottom: `1rem`,
          }}
          onSubmit={(e) => {
            e.preventDefault()
            const p1: BlogUploadType = {
              title,
              slug,
              subtitle,
              description,
              image,
              is_published,
            }

            console.log(p1)
            editBlog(p1)
          }}
        >
          <Box style={{ width: `100%`, display: 'flex', gap: `0.5rem` }}>
            <NumberInput
              placeholder='id'
              label='Package ID'
              value={id}
              onChange={(e: any) => setId(e.target.value)}
              disabled
            />
            <TextInput
              style={{ width: `100%` }}
              required
              label='Blog Slug'
              placeholder='blog-title'
              value={slug}
              onChange={(e: any) => setSlug(e.target.value)}
              disabled
            />
          </Box>
          <TextInput
            required
            label='Title'
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder='A attractive title'
          />
          <TextInput
            required
            label='Subtitle'
            value={subtitle}
            onChange={(e: any) => setSubtitle(e.target.value)}
            placeholder='A attractive title'
          />

          <InputWrapper
            label='Select Image'
            id='full_image'
            description='Select any one image'
            required
          >
            <Image
              height={`100px`}
              width={`100px`}
              style={{ margin: `1rem` }}
              src={previewImage}
            />
            <Input
              accept='image/*'
              type='file'
              id='full_image'
              name='full_image'
              placeholder='Select Image'
              onChange={(e: any) => {
                setPreviewImage(URL.createObjectURL(e.target.files[0]))
                setImage(e.target.files[0])
              }}
            />
          </InputWrapper>
          <InputWrapper label='Content'>
            <RichTextEditor
              value={description}
              onChange={(value: any) => setDescription(value)}
            />
          </InputWrapper>
          <Checkbox
            mt='md'
            checked={is_published}
            onChange={(e: any) => setIs_Published(e.target.checked)}
            label='Is active'
          />

          <Group position='right' mt='md'>
            <Button type='submit'>Save Edit</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

export default EditBlog
