import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Group,
  Input,
  InputWrapper,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import RichTextEditor from '@mantine/rte'
import React from 'react'
import { useBlog } from '../hooks/useBlog'

const AddBlog = () => {
  const initialValue = {
    title: '',
    subtitle: '',
    slug: '',
    image: '',
    description: '',
    date: '',
    is_published: false,
  }
  const form = useForm({ initialValues: initialValue })
  const { addBlog } = useBlog()
  return (
    <>
      <Breadcrumbs>
        <Anchor href={`/blogs`}>Blogs</Anchor>
        <Anchor href={`#`}>Add Blog</Anchor>
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
          onSubmit={form.onSubmit((values) => addBlog(values))}
        >
          <Box style={{ width: `100%`, display: 'flex', gap: `0.5rem` }}>
            <TextInput
              required
              label='Title'
              style={{ width: `100%` }}
              placeholder='Title goes on here..'
              {...form.getInputProps('title')}
            />
            <TextInput
              label='Slug'
              style={{ width: `100%` }}
              placeholder='Enter Slug..'
              {...form.getInputProps('slug')}
            />
          </Box>
          <TextInput
            label='Subtitle'
            style={{ width: `100%` }}
            placeholder='Enter Subtitle..'
            {...form.getInputProps('subtitle')}
          />
          <InputWrapper
            label='Select Image'
            id='full_image'
            description='Select any one image'
            required
          >
            <Input
              accept='image/*'
              type='file'
              id='full_image'
              name='full_image'
              placeholder='Select Image'
              onChange={(e: any) =>
                form.setFieldValue('image', e.target.files[0])
              }
            />
          </InputWrapper>

          <InputWrapper label='Content'>
            <RichTextEditor {...form.getInputProps('description')} />
          </InputWrapper>
          <Checkbox
            mt='md'
            label='Publish'
            {...form.getInputProps('is_published', { type: 'checkbox' })}
          />

          <Group position='right' mt='md'>
            <Button type='submit'>Add Blog</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

export default AddBlog
