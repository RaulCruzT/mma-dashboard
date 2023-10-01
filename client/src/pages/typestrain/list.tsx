import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { ITypeStrain } from "../../interfaces/typestrain";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Typography } from "@mui/material";

export const TypeStrainList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<ITypeStrain>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting type strains',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<ITypeStrain>[]>(
        () => [
            {
                field: "name",
                headerName: "Name",
                minWidth: 150,
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
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={row._id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                resource="typestrain"
                                recordItemId={row._id}
                                mutationMode="undoable"
                                confirmTitle={`Are you sure to delete ${row.name} type strain?`}
                                successNotification={{
                                    message: 'Successfully deleted type strain',
                                    type: "success",
                                }}
                                errorNotification={{
                                    message: 'Error deleting a type strain',
                                    type: "error",
                                }}
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
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Type Strains</Typography>}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                getRowId={(row: ITypeStrain) =>  row._id}
                filterModel={undefined}
                autoHeight
                pageSizeOptions={[10, 20, 50, 100]}
                slots={{
                    toolbar: GridToolbar,
                }}
                sx={{
                    ...dataGridProps.sx,
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                }}
            />
        </List>
    )
}
