import { AspectRatio } from '@mantine/core'
import { useParams } from 'react-router-dom'

export const SpeckleViewer = () => {
  const { projectId, modelId } = useParams()
  const width = '100%'

  return (
    <AspectRatio ratio={16 / 9}>
        {/* Add Speckle Viewer iframe */}
    </AspectRatio>
  )
}
