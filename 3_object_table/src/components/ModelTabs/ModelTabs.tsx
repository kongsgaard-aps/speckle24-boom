import {Divider, Grid, NavLink} from '@mantine/core'
import {useNavigate, useParams} from 'react-router-dom'
import {FetchBoundary} from '@components'

export const ModelTabs = () => {
    const {projectId, modelId} = useParams()
    const navigate = useNavigate()

    // TODO - Write GetProjectQuery
    // TODO - Get Models for Project
    // TODO - Navigate to the first model

    return (
        <FetchBoundary error={error} loading={loading}>
            <Grid>
                {/* Create tabs for the different model with navigation functionality */}
                {/*Use NavLink from Mantine to do so: https://mantine.dev/core/nav-link/*/}
            </Grid>
            <Divider mb='md' mt='sm'/>
        </FetchBoundary>
    )
}
