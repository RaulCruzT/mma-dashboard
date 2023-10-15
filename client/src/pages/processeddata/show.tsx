import {
    IResourceComponentsProps,
    useShow
} from "@refinedev/core";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Show } from "@refinedev/mui";
import { IProcessedData } from "../../interfaces/processeddata";

export const ProcessedDataShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IProcessedData>({
        errorNotification: () => {
            return {
                message: 'Error getting processed data data',
                type: "error",
            };
        },
    });

    return (
        <Show title={<Typography variant="h5">Show Processed data</Typography>}>
            <Stack>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Actinobacteria</TableCell>
                                <TableCell align="right">{queryResult.data?.data.actinobacteria.identifierStrain}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Data source</TableCell>
                                <TableCell align="right">{queryResult.data?.data.dataSource}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Equipment</TableCell>
                                <TableCell align="right">{queryResult.data?.data.equipment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>File name</TableCell>
                                <TableCell align="right">{queryResult.data?.data.fileName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Mass detection</TableCell>
                                <TableCell align="right">{queryResult.data?.data.massDetection}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Chromatogram builder</TableCell>
                                <TableCell align="right">{queryResult.data?.data.chromatogramBuilder}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Deconvolution</TableCell>
                                <TableCell align="right">{queryResult.data?.data.deconvolution}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Isotope</TableCell>
                                <TableCell align="right">{queryResult.data?.data.isotope}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Filtered</TableCell>
                                <TableCell align="right">{queryResult.data?.data.filtered}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Identification</TableCell>
                                <TableCell align="right">{queryResult.data?.data.identification}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Alignment</TableCell>
                                <TableCell align="right">{queryResult.data?.data.alignment}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Gap filling</TableCell>
                                <TableCell align="right">{queryResult.data?.data.gapFilling}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                <TableCell align="right">{queryResult.data?.data.comments}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Show>
    )
}
