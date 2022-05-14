import {
  ActionIcon,
  Box,
  Checkbox,
  Image,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { useModals } from '@mantine/modals'

import { useNavigate } from 'react-router-dom'
import { Pencil, Trash } from 'tabler-icons-react'
import { useBlog } from '../hooks/useBlog'

const AllBlogs = () => {
  const { blogs, deleteBlog } = useBlog()
  const deletePackageModal = useModals()
  const navigate = useNavigate()
  const handleBlogDelete = (blog_slug: string) => {
    deletePackageModal.openConfirmModal({
      title: 'Delete a blog',
      centered: true,
      children: <Text size='sm'>Are you sure you want to delete a blog?</Text>,
      labels: { confirm: 'Delete Blog', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteBlog(blog_slug),
    })
  }
  const getDate = (date1: Date) => {
    const date = new Date(date1)
    return date.toLocaleDateString()
  }

  return (
    <>
      <Title order={1}>All Blogs</Title>
      <Table style={{ marginTop: `2rem` }}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Subtitle</th>
            <th>Thumbnail Image</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog, index) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>{blog.slug}</td>
              <td>{blog.subtitle}</td>
              <td>
                <Image
                  src={blog.thumbnail_Image}
                  height={`50px`}
                  width={`50px`}
                />
              </td>
              <td>{getDate(blog.date as Date)}</td>
              <td>
                <Checkbox checked={blog.is_published} readOnly />
              </td>

              <td>
                <Box style={{ display: 'flex', gap: '0.5rem' }}>
                  <ActionIcon
                    variant='filled'
                    color={`blue`}
                    onClick={() => navigate(`/blogs/edit-blog/${blog.slug}`)}
                  >
                    <Pencil />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => handleBlogDelete(blog.slug)}
                    variant='filled'
                    color={`red`}
                  >
                    <Trash />
                  </ActionIcon>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AllBlogs
