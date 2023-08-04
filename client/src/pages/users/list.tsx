import { List, useDataGrid } from "@refinedev/mui";
import { IUser } from "../../interfaces/user";
import { IResourceComponentsProps } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Avatar, Grid } from "@mui/material";


export const UsersList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IUser>({
        initialPageSize: 10,
    });

    const columns = React.useMemo<GridColDef<IUser>[]>(
        () => [
            {
                field: "name",
                headerName: "Name",
                minWidth: 150,
                flex: 1,
            },
            {
                field: "avatar",
                headerName: "Avatar",
                renderCell: function render({ row }) {
                    return <Avatar src={row.avatar[0].url} />;
                },
                minWidth: 100,
                flex: 1,
                sortable: false,
            },
            {
                field: "role",
                headerName: "Role",
                minWidth: 150,
                flex: 1,
            },
        ],
        [],
    );

    return (
        <Grid container>
            <Grid item xs={24} lg={12}>
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: IUser) =>  row._id}
                        filterModel={undefined}
                        autoHeight
                        pageSizeOptions={[10, 20, 50, 100]}
                    />
                </List>
            </Grid>
        </Grid>
    );

}
