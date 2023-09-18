import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { IAssembly } from "../../interfaces/assembly";
import {
    IResourceComponentsProps,
} from "@refinedev/core";
import {
    DataGrid,
    GridColDef,
    GridToolbar,
    getGridStringOperators
} from "@mui/x-data-grid";
import React from "react";

export const AssemblyList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IAssembly>({
        initialPageSize: 10,
    });

    const columns = React.useMemo<GridColDef<IAssembly>[]>(
        () => [
            {
                field: "date",
                headerName: "Date",
                minWidth: 150,
                flex: 1,
                filterable: false,
            },
            {
                field: "softwareTrimming",
                headerName: "Software trimming",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "softwareAssembly",
                headerName: "Software assembly",
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
                                resource="assembly"
                                recordItemId={row._id}
                                mutationMode="undoable"
                                confirmTitle={`Are you sure to delete the assembly?`}
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
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                getRowId={(row: IAssembly) =>  row._id}
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
