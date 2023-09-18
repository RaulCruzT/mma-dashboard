import { List, useDataGrid, ShowButton } from "@refinedev/mui";
import { IActinobacteria } from "../../interfaces/actinobacteria";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Typography } from "@mui/material";

export const ActinobacteriaList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IActinobacteria>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting actinobacteria',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<IActinobacteria>[]>(
        () => [
            {
                field: "identifierStrain",
                headerName: "Strain",
                minWidth: 150,
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "identifierGenera",
                headerName: "Genera",
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: function render({ row }) {
                    return <em>{row?.identifierGenera?.name}</em>
                }
            },
            {
                field: "identifierSpecies",
                headerName: "Species",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "arnr16sCompleteness",
                headerName: "rRNA 16S",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <ShowButton
                                size="small"
                                hideText
                                recordItemId={row._id}
                            />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                flex: 0.5,
                minWidth: 80,
                sortable: false,
                filterable: false,
            },
        ],
        [],
    );

    return (
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Actinobacteria</Typography>}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                getRowId={(row: IActinobacteria) =>  row._id}
                filterModel={undefined}
                autoHeight
                pageSizeOptions={[10, 20, 50, 100]}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </List>
    )
}