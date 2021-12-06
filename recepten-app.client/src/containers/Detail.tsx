import React from 'react'
import { useFetch } from '../util/api/useFetch'
import { Dish, Unit } from '../types/index'

type Props = {
  id: number | null
}

export const Detail = ({ id }: Props) => {
  const { data: unit, loading, error, refetch } = useFetch<Unit>(`api/units/${id}`)

  return (
    <div>
      {unit && (
        <div>
          <p>{unit.name}</p>
        </div>
      )}
    </div>
  )
}
