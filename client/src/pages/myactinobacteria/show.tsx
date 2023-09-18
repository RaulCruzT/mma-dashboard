import {
    IResourceComponentsProps,
    useShow
} from "@refinedev/core";
import { IMyActinobacteria } from "../../interfaces/myactinobacteria";
import { Accordion, AccordionDetails, AccordionSummary, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { LinkButton } from "../../components";
import { Show } from "@refinedev/mui";

export const MyActinobacteriaShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IMyActinobacteria>();

    return (
        <Show title={<Typography variant="h5">Show My Actinobacteria</Typography>}>
            <Stack>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Identification</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Strain</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.identifierStrain}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Genera</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.identifierGenera.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Species</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.identifierSpecies}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Main photo link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.identifierMainPhoto} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Other photos link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.identifierPhotos} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Local storage</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.identifierLocalStorage}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>International storage</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.identifierInternationalStorage}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.identifierComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Geographical data</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Isolation site</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.geographyIsolationSite}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Coordinates</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.geographyCoordinates}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Isolation source</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.geographyIsolationSource}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Altitude (m.a.s.l)</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.geographyAltitude}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.geographyComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Isolation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Medium</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.isolationMedium}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Temperature (°C)</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.isolationTemperature}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Method</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.isolationMethod}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Person in charge</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.isolationResponsible}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Thesis/Paper</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.isolationThesisPaper}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Thesis/Paper link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.isolationThesisPaperLink} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.isolationComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>rRNA 16S</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Completeness</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.arnr16sCompleteness}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Size (?)</TableCell>
                                        <TableCell align="right">{queryResult.data?.data.arnr16sSize}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Sequence file link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.arnr16sSequenceFile} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Macrogen file link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.arnr16sMacrogenFile} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.arnr16sComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Characterization</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Growing media</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.characterizationGrowingMedia.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Not growing media</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.characterizationNotGrowingMedia.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Mycelial</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationMycelial}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Day of appearance of the first colonies</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationColoniesDay}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Sporulation start day</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationSporulationDay}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Biomass collection day</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationBiomassDay}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Shape</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationShape}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Border (margin of the colony)</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationBorder}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Elevation</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationElevation}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Surface</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationSurface}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Color</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationColor}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Transparency</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationTransparency}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Brightness</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationBrightness}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.characterizationComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Genome</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Raw data link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.genomeRawData} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.genomeComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Bioactivity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>File link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.bioactivityFile} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Yes</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.bioactivityYes.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>No</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.bioactivityNo.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Na</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.bioactivityNa.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.bioactivityComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Metabolomics</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Medina Foundation reports link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.metabolomicsMedinaFoundationReports} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Raw data link</TableCell>
                                        <TableCell align="right"><LinkButton href={queryResult?.data?.data.metabolomicsRawData} /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.metabolomicsComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Enzymes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Yes</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.enzymesYes.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>No</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.enzymesNo.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Na</TableCell>
                                        <TableCell align="right">
                                            {queryResult?.data?.data.enzymesNa.map(x => x.name).join(", ")}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" sx={{fontWeight: 700}}>Comments</TableCell>
                                        <TableCell align="right">{queryResult?.data?.data.enzymesComments}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Show>
    )
}
