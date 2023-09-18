import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { ICultureMedium } from "../../interfaces/culturemedium";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";
import { Typography } from "@mui/material";

export const CultureMediumList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<ICultureMedium>({
        initialPageSize: 10,
        errorNotification: () => {
            return {
                message: 'Something went wrong when getting culture mediums',
                type: "error",
            };
        },
    });

    const columns = React.useMemo<GridColDef<ICultureMedium>[]>(
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
                                resource="culturemedium"
                                recordItemId={row._id}
                                mutationMode="undoable"
                                confirmTitle={`Are you sure to delete ${row.name} culture medium?`}
                                successNotification={{
                                    message: 'Successfully deleted culture medium',
                                    type: "success",
                                }}
                                errorNotification={{
                                    message: 'Error deleting a culture medium',
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
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }} title={<Typography variant="h5">Culture Mediums</Typography>}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                getRowId={(row: ICultureMedium) =>  row._id}
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
