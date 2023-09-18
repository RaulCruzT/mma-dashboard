import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { IAssembly } from "../../interfaces/assembly";
import { IResourceComponentsProps, CrudFilters } from "@refinedev/core";
import { DataGrid, GridColDef, GridToolbar, getGridStringOperators } from "@mui/x-data-grid";
import React from "react";

export const AssemblyList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IAssembly>({
        initialPageSize: 10,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSearch: (params: any) => {
            const filters: CrudFilters = [];
            const { myactinobacteria } = params;

            filters.push({
                field: "myactinobacteria._id",
                operator: "eq",
                value: (myactinobacteria ?? [].length) > 0 ? myactinobacteria : undefined,
            });

            return filters;
        },
    });

    const columns = React.useMemo<GridColDef<IAssembly>[]>(
        () => [
            {
                field: "date",
                headerName: "Date",
                minWidth: 150,
                flex: 1,
                sortable: false,
                filterable: false,
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
