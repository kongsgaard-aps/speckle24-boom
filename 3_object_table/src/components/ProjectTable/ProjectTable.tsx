import { useMemo } from 'react'
import {
  MantineReactTable,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  useMantineReactTable,
} from 'mantine-react-table'
import { SpeckleObject } from '@speckle/objectloader'
import { useFetchSpeckle } from './useFetchSpeckle.ts'
import { useParams } from 'react-router-dom'
import { useGetLatestVersionQuery, useGetProjectNameQuery } from '@queries'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { IconDownload } from '@tabler/icons-react'
import { Button } from '@mantine/core'

export const ProjectTable = () => {
  const { projectId, modelId } = useParams()

  // TODO - Write GetLatestVersionQuery
  // TODO - Get versionId

  // TODO - Write useFetchSpeckle
  const {
    loading: speckleLoading,
    error: speckleError,
    data: speckleData,
  } = useFetchSpeckle({
    variables: {
      projectId: projectId!,
      versionId: versionId!,
    },
    skip: !projectId || !versionId,
  })

  // TODO - Write useGetProjectNameQuery

  const getQuantity = ({ cell }: { cell: MRT_Cell<SpeckleObject> }) => {
    const value = cell.getValue<{ value: number; units: string }>()

    return (
      <>
        {value?.value?.toFixed(2)}
        {value?.units}
      </>
    )
  }

  const columns = useMemo<MRT_ColumnDef<SpeckleObject>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableEditing: false,
      },
      // TODO - Add columns for Type, Family, Volume and Area
    ],
    [],
  )

  const handleExportRows = (rows: MRT_Row<SpeckleObject>[], table: MRT_TableInstance<SpeckleObject>) => {
    const rowData = rows.map((row) => row.original)
    const visibleColumns = table.getVisibleFlatColumns().filter((column) => !column.id.startsWith('mrt'))

    const getRowValue = (value: unknown) => {
      if (value && typeof value === 'object') {
        // @ts-expect-error TypeScript bug...
        return value.value
      }
      return value
    }

    const flattenRowData = rowData.map((row) =>
      visibleColumns
        // @ts-expect-error column.accessorFn works fine
        .map((column) => ({ [column.columnDef.header as string]: getRowValue(column.accessorFn(row)) }))
        .reduce((prev, next) => ({ ...prev, ...next }), {}),
    )
    const csvConfig = mkConfig({
      fieldSeparator: ',',
      decimalSeparator: '.',
      useKeysAsHeaders: true,
      filename: projectData?.project.name || 'generated',
    })
    const csv = generateCsv(csvConfig)(flattenRowData)
    download(csvConfig)(csv)
  }

  // @ts-expect-error issues with SpeckleObjects
  const tableData: SpeckleObject[] = useMemo(
    () =>
      speckleData?.elements
        .map((category: SpeckleObject) => category?.elements || [])
        // @ts-expect-error issues with SpeckleObjects
        .reduce((prev: SpeckleObject[], next: SpeckleObject[]) => [...prev, ...next], []) || [],
    [speckleData],
  )

  const table = useMantineReactTable({
    columns,
    data: tableData,
    createDisplayMode: 'row',
    editDisplayMode: 'table',
    enableEditing: true,
    enableColumnActions: true,
    enableColumnFilters: true,
    enablePagination: true,
    enableSorting: true,
    enableGrouping: true,
    paginationDisplayMode: 'pages',
    enableGlobalFilter: false,
    mantinePaperProps: {
      shadow: undefined,
    },
    mantineToolbarAlertBannerProps:
      speckleError || versionError
        ? {
            color: 'red',
            children: speckleError || versionError?.message,
          }
        : undefined,
    mantineTableProps: {
      highlightOnHover: false,
      striped: 'odd',
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: false,
    },
    renderToolbarInternalActions: ({ table }) => (
      <>
        <MRT_ShowHideColumnsButton table={table} />
      </>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      // TODO - Add button for exporting rows
    ),
    state: {
      isLoading: speckleLoading || versionLoading,
      showAlertBanner: !!speckleError || !!versionError,
      showSkeletons: speckleLoading || versionLoading,
    },
    initialState: {
      density: 'xs',
      columnVisibility: {
        id: false,
      },
    },
  })

  return <MantineReactTable table={table} />
}
