import { useCallback, useEffect, useState } from 'react'
import ObjectLoader, { SpeckleObject } from '@speckle/objectloader'

interface useFetchSpeckleProps {
  variables: {
    projectId: string
    versionId: string
    options?: Partial<{
      enableCaching: boolean
      fullyTraverseArrays: boolean
      excludeProps: string[]
    }>
  }
  skip?: boolean
}

interface SpeckleCollection extends SpeckleObject {
  elements: SpeckleObject[]
}

export const useFetchSpeckle = ({ variables, skip }: useFetchSpeckleProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<SpeckleCollection | undefined>()

  const fetchSpeckle = useCallback(() => {
    if (skip) return

    setLoading(true)
    setError(undefined)
    setData(undefined)
    // TODO - Create ObjectLoader object

    const filterSpeckleObject = (speckleData: SpeckleCollection) => {
      const excludedElements = [
        'Load Cases',
        'Spaces',
        'HVAC Load Building Types',
        'HVAC Load Space Types',
        'Grids',
        'Pipe Segments',
        'Rvt Links',
        'Lines',
        'Areas',
        'Vertical Circulation',
        'Analytic Spaces',
        'Analytic Surfaces',
        'Lighting Fixtures',
        'Food Service Equipments',
        'Generic Model',
        'Model Groups',
      ]
      // TODO - Filter out elements
    }

    // TODO - Run ObjectLoader
  }, [variables.projectId, variables.versionId, skip])

  useEffect(() => {
    fetchSpeckle()
  }, [fetchSpeckle])

  return { loading, error, data }
}
