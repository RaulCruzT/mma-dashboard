import { List, useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { IProcessedData } from "../../interfaces/processeddata";
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

export const ProcessedDataList: React.FC<IResourceComponentsProps> = () => {
    const { dataGridProps } = useDataGrid<IProcessedData>({
        initialPageSize: 10,
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
                getRowId={(row: IProcessedData) =>  row._id}
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
