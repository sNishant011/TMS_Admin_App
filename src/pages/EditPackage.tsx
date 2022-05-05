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
  Loader,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import RichTextEditor from '@mantine/rte'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Package } from '../configs/customTypes'
import { usePackage } from '../hooks/usePackage'

const EditPackage = () => {
  const { packageSlug } = useParams()
  const { getPackageBySlug, editPackage } = usePackage()
  const [packageToBeEdited, setPackageToBeEdited] = useState<Package | null>(
    null
  )
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('N/A')
  const [thumbnail_Image, setThumbnail_Image] = useState<File | string>('N/A')
  const [slug, setSlug] = useState<string>('')
  const [image, setImage] = useState<File | string>('')
  const [no_of_days, setNo_of_days] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [is_active, setIs_active] = useState<boolean>(false)
  const [is_featured, setIs_featured] = useState<boolean>(false)
  const [summary, setSummary] = useState<string>('')
  const [full_detail, setFull_detail] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')
  // method to convert url to image file type
  const convertUrlToImage = (url: string) => {
    const imageName = url.split('/').pop()
    let file
    file = new File([], 'image.jpg', { type: 'image/jpeg' })
    if (imageName) {
      file = new File([], imageName, {
        type: 'image/jpeg',
      })
    }
    console.log(file)
    return file
  }
  useEffect(() => {
    if (packageSlug) {
      const p1 = getPackageBySlug(packageSlug)

      if (p1) {
        // p1.image = convertUrlToImage(p1.image as string)
        setPackageToBeEdited(p1)
      }
    }
  }, [getPackageBySlug, packageSlug, setPackageToBeEdited])

  useEffect(() => {
    if (packageToBeEdited) {
      console.log(packageToBeEdited)
      setId(packageToBeEdited.id)
      setThumbnail_Image(packageToBeEdited.thumbnail_Image)
      setTitle(packageToBeEdited.title)
      setSlug(packageToBeEdited.slug)
      setNo_of_days(packageToBeEdited.no_of_days)
      setPrice(packageToBeEdited.price)
      setIs_active(packageToBeEdited.is_active)
      setIs_featured(packageToBeEdited.is_featured)
      setSummary(packageToBeEdited.summary)
      setFull_detail(packageToBeEdited.full_detail)

      const image_url = packageToBeEdited.thumbnail_Image
      setPreviewImage(image_url)
      setImage(convertUrlToImage(image_url as string))
    }
  }, [packageToBeEdited])

  if (packageToBeEdited === null) {
    return <Loader />
  }
  return (
    <>
      <Breadcrumbs>
        <Anchor href={`/packages`}>Packages</Anchor>
        <Anchor href={`#`}>Edit</Anchor>
      </Breadcrumbs>
      <Title order={1}>Editing {packageToBeEdited.title}</Title>
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
            const p1 = {
              id,
              title,
              slug,
              image,
              no_of_days,
              price,
              is_active,
              is_featured,
              summary,
              full_detail,
            }
            console.log(p1)
            editPackage(p1)
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
              label='Package Slug'
              placeholder='package-name'
              value={packageSlug}
              onChange={(e: any) => setSlug(e.target.value)}
              disabled
            />
          </Box>
          <TextInput
            required
            label='Title'
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder='your@email.com'
          />

          <Box style={{ width: `100%`, display: 'flex', gap: `0.5rem` }}>
            <NumberInput
              value={no_of_days}
              placeholder='No. of Days'
              label='Number of Days'
              onChange={(e: any) => setNo_of_days(e)}
            />
            <NumberInput
              value={price}
              onChange={(value: number) => setPrice(value)}
              required
              step={500}
              label='Price'
              placeholder='Price'
            />
          </Box>

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
          <Textarea
            placeholder='Summary'
            value={summary}
            onChange={(e: any) => setSummary(e.target.value)}
            label='Summary'
          />
          <InputWrapper label='Full Detail'>
            <RichTextEditor
              value={full_detail}
              onChange={(value: any) => setFull_detail(value)}
            />
          </InputWrapper>
          <Checkbox
            mt='md'
            checked={is_active}
            onChange={(e: any) => setIs_active(e.target.checked)}
            label='Is active'
          />

          <Checkbox
            mt='md'
            checked={is_featured}
            onChange={(e: any) => setIs_featured(e.target.checked)}
            label='Is Featured'
          />
          <Group position='right' mt='md'>
            <Button type='submit'>Save Edit</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

export default EditPackage
