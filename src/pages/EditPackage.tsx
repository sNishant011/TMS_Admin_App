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
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import RichTextEditor from '@mantine/rte'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar } from 'tabler-icons-react'
import { EditPackageType, Package } from '../configs/customTypes'
import { usePackage } from '../hooks/usePackage'

const EditPackage = () => {
  const { packageSlug } = useParams()
  const { getPackageBySlug, editPackage } = usePackage()
  const [packageToBeEdited, setPackageToBeEdited] = useState<Package | null>(
    null
  )
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('N/A')
  const [slug, setSlug] = useState<string>('')
  const [image, setImage] = useState<File | string>('')
  const [no_of_days, setNo_of_days] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [is_active, setIs_active] = useState<boolean>(false)
  const [is_featured, setIs_featured] = useState<boolean>(false)
  const [summary, setSummary] = useState<string>('')
  const [full_detail, setFull_detail] = useState<string>('')
  const [start_day, setStart_day] = useState<string | null>(null)
  const [end_day, setEnd_day] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string>('')

  const [date, setDate] = useState<[Date | null, Date | null]>([null, null])
  useEffect(() => {
    if (packageSlug) {
      const p1 = getPackageBySlug(packageSlug)
      if (p1) {
        setPackageToBeEdited(p1)
      }
    }
  }, [getPackageBySlug, packageSlug, setPackageToBeEdited])

  useEffect(() => {
    if (packageToBeEdited) {
      setId(packageToBeEdited.id)
      setTitle(packageToBeEdited.title)
      setSlug(packageToBeEdited.slug)
      setNo_of_days(packageToBeEdited.no_of_days)
      setPrice(packageToBeEdited.price)
      setIs_active(packageToBeEdited.is_active)
      setIs_featured(packageToBeEdited.is_featured)
      setSummary(packageToBeEdited.summary)
      console.log(packageToBeEdited.full_detail)
      setFull_detail(packageToBeEdited.full_detail)
      const image_url = packageToBeEdited.thumbnail_Image
      setPreviewImage(image_url)
      setStart_day(packageToBeEdited.start_day)
      setEnd_day(packageToBeEdited.end_day)
    }
  }, [packageToBeEdited])
  useEffect(() => {
    if (start_day && end_day) {
      setDate([new Date(start_day), new Date(end_day)])
    }
  }, [start_day, end_day])
  useEffect(() => {
    if (date[0] && date[1]) {
      const no_of_days =
        (date[1].getTime() - date[0].getTime()) / (1000 * 60 * 60 * 24)
      setNo_of_days(no_of_days)
    }
  }, [date])
  if (packageToBeEdited === null || full_detail === '') {
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
            if (date[0] && date[1]) {
              const datas = {
                title,
                slug,
                no_of_days,
                price,
                is_active,
                is_featured,
                summary,
                full_detail,
                image,
                start_day: date[0].toISOString().split('T')[0],
                end_day: date[1].toISOString().split('T')[0],
              }
              editPackage(datas)
            }
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

          <DateRangePicker
            label='Tour Duration'
            placeholder='Pick date range'
            value={date}
            onChange={setDate}
            minDate={dayjs(new Date()).toDate()}
            icon={<Calendar size={`16`} />}
            dropdownType={`modal`}
            firstDayOfWeek={`sunday`}
            amountOfMonths={2}
          />
          <Box style={{ width: `100%`, display: 'flex', gap: `0.5rem` }}>
            <NumberInput
              value={no_of_days}
              placeholder='No. of Days'
              label='Number of Days'
              disabled
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
