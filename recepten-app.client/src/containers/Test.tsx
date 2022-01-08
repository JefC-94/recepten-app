import React, { useState } from 'react'
import { fetchDelete, fetchPost, useFetch } from '../util/api/useFetch'
import { Button, CircularProgress, Container } from '@mui/material'
import { Detail } from './Detail'
import { Response, Unit } from '../types'

export const Test = () => {
  const { data: units, error, loading, refetch } = useFetch<Unit[]>(`api/units`)

  const [selectedDishId, setSelectedDishId] = useState<number | null>(null)

  const createNew = async () => {
    fetchPost(`api/units`, {
      name: 'test',
      name_plural: 'testen',
    }).then((response: Response) => {
      if (response.success) {
        refetch()
      } else {
        console.log(response.message)
      }
    })
  }

  const deleteItem = async (id: number) => {
    fetchDelete(`api/units`, id).then((response: Response) => {
      if (response.success) {
        refetch()
      } else {
        console.log(response.message)
      }
    })
  }

  return (
    <>
      {error && JSON.stringify(error)}
      <div>
        <h1>Units</h1>
        {loading && <CircularProgress />}
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
              <button
                onClick={() => {
                  deleteItem(unit.id)
                }}
              >
                -
              </button>
            </p>
          ))}
      </div>
      <button
        onClick={() => {
          refetch()
        }}
      >
        Reload
      </button>
      <button
        //variant="primary"
        onClick={() => {
          createNew()
        }}
      >
        Create New Unit
      </button>
      <Detail id={selectedDishId} />
    </>
  )
}
