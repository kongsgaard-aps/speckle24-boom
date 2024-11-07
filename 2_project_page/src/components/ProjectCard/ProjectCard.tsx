import { Box, Button, Card, Group, HoverCard, Text, UnstyledButton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { FetchBoundary } from '../FetchBoundary'
import { gql, useQuery } from '@apollo/client'
import { GetNullable, GetStreamsQuery } from '@queries'
import { IconDots } from '@tabler/icons-react'

type GetStreamsQueryProject = GetNullable<GetStreamsQuery['activeUser'], 'projects'>['items'][number]

interface ProjectCardProps {
  project: GetStreamsQueryProject
}

export const ProjectCard = (props: ProjectCardProps) => {
  const { project } = props
  const navigate = useNavigate()
  const previewUrl = project?.versions?.items?.[0]?.previewUrl.replace(import.meta.env.VITE_SPECKLE_SERVER_URL, '')

  // TODO - Fetch Project Preview

  return (
    <FetchBoundary error={error} loading={loading}>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        {/* TODO - Display the preview image to the top of the card */}
        {/* TODO - Display project name */}
        {/* TODO - Display button with a link to Speckle's app */}
        {/* TODO - Display project description */}
        {/* TODO - Display button for opening the table view */}
      </Card>
    </FetchBoundary>
  )
}
