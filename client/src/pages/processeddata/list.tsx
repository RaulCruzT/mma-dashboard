import { List, useDataGrid, EditButton, DeleteButton, useAutocomplete } from "@refinedev/mui";
import { IProcessedData } from "../../interfaces/processeddata";
import {
    IResourceComponentsProps,
    useGetIdentity,
    HttpError,
    CrudFilters,
    BaseRecord,
    getDefaultFilter
} from '@refinedev/core';
import {
    DataGrid,
    GridColDef,
    GridToolbar,
    getGridStringOperators
} from "@mui/x-data-grid";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import React from "react";
import { IUser } from "../../interfaces/user";
import { UserRoles } from "../../enums/user.enum";
import { IProcessedDataFilterVariables } from "../../interfaces/utils";
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material";

export const ProcessedDataList: React.FC<IResourceComponentsProps> = () => {
    const { data: user } = useGetIdentity<IUser>();
    const role = localStorage.getItem("role") ?? UserRoles.User;

    const { dataGridProps, search, filters } = useDataGrid<
        IProcessedData,
        HttpError,
        IProcessedDataFilterVariables
    >({
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { actinobacteria } = params;

            filters.push({
                field: "actinobacteria",
                operator: "eq",
                value: actinobacteria,
            });

            return filters;
        },
    });

    const columns = React.useMemo<GridColDef<IProcessedData>[]>(
        () => [
            {
                field: "massDetection",
                headerName: "Mass detection",
                minWidth: 150,
                flex: 1,
                filterable: false,
            },
            {
                field: "chromatogramBuilder",
                headerName: "Chromatogram builder",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "deconvolution",
                headerName: "Deconvolution",
                flex: 1,
                filterOperators: getGridStringOperators().filter(
                    (operator) => operator.value === 'contains'
                )
            },
            {
                field: "isotope",
                headerName: "Isotope",
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
                            {
                                (user?.email === row.creator.email || [UserRoles.Admin, UserRoles.Manager].includes(role as UserRoles)) &&
                                <>
                                    <EditButton
                                        size="small"
                                        hideText
                                        recordItemId={row._id}
                                    />
                                    <DeleteButton
                                        size="small"
                                        hideText
                                        resource="processeddata"
                                        recordItemId={row._id}
                                        mutationMode="undoable"
                                        confirmTitle={`Are you sure to delete the processed data?`}
                                    />
                                </>
                            }

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
        [role, user?.email],
    );

    const { handleSubmit, control } = useForm<
        BaseRecord,
        HttpError,
        IProcessedDataFilterVariables
    >({
        defaultValues: {
            actinobacteria: getDefaultFilter("actinobacteria", filters, "eq"),
        },
    });

    const { autocompleteProps: actinobacteriaAutocompleteProps } = useAutocomplete({
        resource: "actinobacteria",
        defaultValue: getDefaultFilter("actinobacteria", filters, "eq"),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title={"Filters"} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <Controller
                                control={control}
                                name="actinobacteria"
                                render={({ field }) => (
                                    <Autocomplete
                                        {...actinobacteriaAutocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?._id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return item.identifierStrain
                                                ? item.identifierStrain
                                                : actinobacteriaAutocompleteProps?.options?.find(
                                                    (p) =>
                                                        p._id.toString() ===
                                                        item.toString(),
                                                )?.identifierStrain ?? "";
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === undefined ||
                                            option?._id?.toString() ===
                                                (value?._id ?? value)?.toString()
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={"Actinobacteria"}
                                                placeholder={"Actinobacteria"}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                {"Filter"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
                <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        getRowId={(row: IProcessedData) =>  row._id}
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
            </Grid>
        </Grid>
    )
}
