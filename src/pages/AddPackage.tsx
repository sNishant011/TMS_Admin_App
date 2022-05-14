import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Group,
  Input,
  InputWrapper,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import RichTextEditor from '@mantine/rte'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'tabler-icons-react'
import { usePackage } from '../hooks/usePackage'
import 'dayjs/locale/ne'
import dayjs from 'dayjs'
const AddPackage = () => {
  const initialValue = {
    title: '',
    image: '',
    no_of_days: 0,
    price: 0,
    slug: '',
    is_active: false,
    is_featured: false,
    summary: '',
    full_detail: '',
  }
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null])
  const [noOfDays, setNoOfDays] = useState(0)
  const { addPackage } = usePackage()
  useEffect(() => {
    if (date[0] && date[1]) {
      const no_of_days =
        (date[1].getTime() - date[0].getTime()) / (1000 * 60 * 60 * 24)
      setNoOfDays(no_of_days)
    }
  }, [date])
  const form = useForm({ initialValues: initialValue })
  return (
    <>
      <Breadcrumbs>
        <Anchor href={`/packages`}>Packages</Anchor>
        <Anchor href={`#`}>Add Package</Anchor>
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
          onSubmit={form.onSubmit((values) => {
            if (date[0] && date[1]) {
              const datas = {
                ...values,
                start_day: date[0].toISOString().split('T')[0],
                end_day: date[1].toISOString().split('T')[0],
                no_of_days: noOfDays,
              }
              addPackage(datas)
            }
          })}
        >
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
              placeholder='No. of Days'
              label='Number of Days'
              value={noOfDays}
              disabled
            />
            <NumberInput
              required
              step={500}
              label='Price'
              placeholder='Price'
              {...form.getInputProps('price')}
            />
          </Box>
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
          <Textarea
            placeholder='Summary'
            label='Summary'
            {...form.getInputProps('summary')}
          />
          <InputWrapper label='Full Detail'>
            <RichTextEditor {...form.getInputProps('full_detail')} />
          </InputWrapper>
          <Checkbox
            mt='md'
            label='Is active'
            {...form.getInputProps('is_active', { type: 'checkbox' })}
          />

          <Checkbox
            mt='md'
            label='Is Featured'
            {...form.getInputProps('is_featured', { type: 'checkbox' })}
          />
          {/* <Select
            label='Save as'
            placeholder='Draft/Publish'
            style={{ width: `150px` }}
            value={form.getInputProps('is_published').value}
            onChange={(value: string) =>
              form.setFieldValue('is_published', Boolean(value))
            }
            data={[
              { value: 'true', label: 'Publish' },
              { value: 'false', label: 'Draft' },
            ]}
          /> */}
          <Group position='right' mt='md'>
            <Button type='submit'>Add Package</Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

export default AddPackage
