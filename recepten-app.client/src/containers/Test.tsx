import React, { useState } from 'react'
import { fetchPost, useFetch } from '../util/api/useFetch'
import { Button, Container } from '@mui/material'
import { Detail } from './Detail'
import { Unit } from '../types'
import useSWR, { mutate } from 'swr'
import axios from 'axios'

export const Test = () => {
  const url = 'http://localhost:7555/api/units'

  const fetcher = (url: string) =>
    axios.get(url).then((response: any) => {
      return response.data
    })

  const { data: units, error } = useSWR<Unit[]>(url, fetcher)

  const [selectedDishId, setSelectedDishId] = useState<number | null>(null)

  const createNew = async () => {
    const newItemId = await fetchPost(`http://localhost:7555/api/units`, {
      name: 'test',
      name_plural: 'testen',
    })
    if (newItemId) {
      mutate(url)
    } else {
      alert('something went wrong')
    }
  }

  return (
    <div>
      {error && JSON.stringify(error)}
      <Container>
        {units &&
          units.map((unit: Unit) => (
            <p key={unit.id}>
              <button
                onClick={() => {
                  setSelectedDishId(unit.id)
                }}
              >
                {unit.id} {unit.name}
              </button>
            </p>
          ))}
      </Container>
      <Button
        onClick={() => {
          console.log('waht thefuck')
        }}
      >
        Reload
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          createNew()
        }}
      >
        Create New Unit
      </Button>
      <Detail id={selectedDishId} />
    </div>
  )
}
