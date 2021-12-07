import { useFetch } from '../util/api/useFetch'
import { Unit } from '../types/index'

type Props = {
  id: number | null
}

export const Detail = ({ id }: Props) => {
  const { data: unit } = useFetch<Unit>(`api/units/${id}`)

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
