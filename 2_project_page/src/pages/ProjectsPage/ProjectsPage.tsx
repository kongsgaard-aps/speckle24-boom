import { useMatches } from '@mantine/core'
import { FetchBoundary } from '@components'

export const ProjectsPage = () => {
  // TODO - Fetch the Projects

  const gridSpan = useMatches({ base: 12, sm: 6, md: 4, xl: 3 })
  return (
    <FetchBoundary error={error} loading={loading}>
        {/* TODO - Create a Grid of ProjectCard */}
    </FetchBoundary>
  )
}
