import {
    IResourceComponentsProps,
    useShow
} from "@refinedev/core";
import { IActinobacteria } from "../../interfaces/actinobacteria";
import { Accordion, AccordionDetails, AccordionSummary, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { LinkButton } from "../../components";

export const ActinobacteriaShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IActinobacteria>();

    return (
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
            {/* <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Genome</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Raw data link
                                    </FormLabel>
                                    <LinkButton href={queryResult?.data?.data.genomeRawData} />
                                    {errors.genomeRawData && (
                                        <FormHelperText error>
                                            {errors.genomeRawData.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Comments
                                    </FormLabel>
                                    <TextField
                                        {...register("genomeComments", {
                                            maxLength: {
                                                value: 400,
                                                message: "You cannot enter more than 400 characters"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        multiline
                                        minRows={5}
                                        disabled
                                    />
                                    {errors.genomeComments && (
                                        <FormHelperText error>
                                            {errors.genomeComments.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion> */}
            {/* <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Bioactivity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        File link
                                    </FormLabel>
                                    <LinkButton href={queryResult?.data?.data.bioactivityFile} />
                                    {errors.bioactivityFile && (
                                        <FormHelperText error>
                                            {errors.bioactivityFile.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Yes
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="bioactivityYes"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = typeStrainYesAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...typeStrainYesAutocompleteProps}
                                                    {...field}
                                                    value={newValue}
                                                    multiple
                                                    clearOnBlur={false}
                                                    onChange={(_, value) => {
                                                        const newValue = value.map((p) => p?._id.toString());
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            typeStrainYesAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id.toString(),
                                                            )?.name ?? ""
                                                        );
                                                    }}
                                                    isOptionEqualToValue={(option, value) => {
                                                        return (
                                                            value === undefined ||
                                                            option?._id?.toString() ===
                                                                value?._id?.toString()
                                                        );
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                name="bioactivityYes"
                                                                id="bioactivityYes"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.bioactivityYes?.message}
                                                                disabled
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.bioactivityYes && (
                                        <FormHelperText error>
                                            {errors.bioactivityYes.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        No
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="bioactivityNo"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = typeStrainNoAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...typeStrainNoAutocompleteProps}
                                                    {...field}
                                                    value={newValue}
                                                    multiple
                                                    clearOnBlur={false}
                                                    onChange={(_, value) => {
                                                        const newValue = value.map((p) => p?._id.toString());
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            typeStrainNoAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id.toString(),
                                                            )?.name ?? ""
                                                        );
                                                    }}
                                                    isOptionEqualToValue={(option, value) => {
                                                        return (
                                                            value === undefined ||
                                                            option?._id?.toString() ===
                                                                value?._id?.toString()
                                                        );
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                name="bioactivityNo"
                                                                id="bioactivityNo"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.bioactivityNo?.message}
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.bioactivityNo && (
                                        <FormHelperText error>
                                            {errors.bioactivityNo.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Na
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="bioactivityNa"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = typeStrainNaAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...typeStrainNaAutocompleteProps}
                                                    {...field}
                                                    value={newValue}
                                                    multiple
                                                    clearOnBlur={false}
                                                    onChange={(_, value) => {
                                                        const newValue = value.map((p) => p?._id.toString());
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            typeStrainNaAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id.toString(),
                                                            )?.name ?? ""
                                                        );
                                                    }}
                                                    isOptionEqualToValue={(option, value) => {
                                                        return (
                                                            value === undefined ||
                                                            option?._id?.toString() ===
                                                                value?._id?.toString()
                                                        );
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                name="bioactivityNa"
                                                                id="bioactivityNa"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.bioactivityNa?.message}
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.bioactivityNa && (
                                        <FormHelperText error>
                                            {errors.bioactivityNa.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Comments
                                    </FormLabel>
                                    <TextField
                                        {...register("bioactivityComments", {
                                            maxLength: {
                                                value: 400,
                                                message: "You cannot enter more than 400 characters"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        multiline
                                        minRows={5}
                                        disabled
                                    />
                                    {errors.bioactivityComments && (
                                        <FormHelperText error>
                                            {errors.bioactivityComments.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion> */}
            {/* <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Metabolomics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} md={6}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Medina Foundation reports link
                                    </FormLabel>
                                    <LinkButton href={queryResult?.data?.data.metabolomicsMedinaFoundationReports} />
                                    {errors.metabolomicsMedinaFoundationReports && (
                                        <FormHelperText error>
                                            {errors.metabolomicsMedinaFoundationReports.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Raw data link
                                    </FormLabel>
                                    <LinkButton href={queryResult?.data?.data.metabolomicsRawData} />
                                    {errors.metabolomicsRawData && (
                                        <FormHelperText error>
                                            {errors.metabolomicsRawData.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Comments
                                    </FormLabel>
                                    <TextField
                                        {...register("metabolomicsComments", {
                                            maxLength: {
                                                value: 400,
                                                message: "You cannot enter more than 400 characters"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        multiline
                                        minRows={5}
                                        disabled
                                    />
                                    {errors.metabolomicsComments && (
                                        <FormHelperText error>
                                            {errors.metabolomicsComments.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion> */}
            {/* <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Enzymes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Yes
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="enzymesYes"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = enzymesYesAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...enzymesYesAutocompleteProps}
                                                    {...field}
                                                    value={newValue}
                                                    multiple
                                                    clearOnBlur={false}
                                                    onChange={(_, value) => {
                                                        const newValue = value.map((p) => p?._id.toString());
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            enzymesYesAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id.toString(),
                                                            )?.name ?? ""
                                                        );
                                                    }}
                                                    isOptionEqualToValue={(option, value) => {
                                                        return (
                                                            value === undefined ||
                                                            option?._id?.toString() ===
                                                                value?._id?.toString()
                                                        );
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                name="enzymesYes"
                                                                id="enzymesYes"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.enzymesYes?.message}
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.enzymesYes && (
                                        <FormHelperText error>
                                            {errors.enzymesYes.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        No
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="enzymesNo"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = enzymesNoAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...enzymesNoAutocompleteProps}
                                                    {...field}
                                                    value={newValue}
                                                    multiple
                                                    clearOnBlur={false}
                                                    onChange={(_, value) => {
                                                        const newValue = value.map((p) => p?._id.toString());
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            enzymesNoAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id.toString(),
                                                            )?.name ?? ""
                                                        );
                                                    }}
                                                    isOptionEqualToValue={(option, value) => {
                                                        return (
                                                            value === undefined ||
                                                            option?._id?.toString() ===
                                                                value?._id?.toString()
                                                        );
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                name="enzymesNo"
                                                                id="enzymesNo"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.enzymesNo?.message}
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.enzymesNo && (
                                        <FormHelperText error>
                                            {errors.enzymesNo.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Na
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="enzymesNa"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = enzymesNaAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...enzymesNaAutocompleteProps}
                                                    {...field}
                                                    value={newValue}
                                                    multiple
                                                    clearOnBlur={false}
                                                    onChange={(_, value) => {
                                                        const newValue = value.map((p) => p?._id.toString());
                                                        field.onChange(newValue);
                                                    }}
                                                    getOptionLabel={(item) => {
                                                        return (
                                                            enzymesNaAutocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p?._id?.toString() ===
                                                                    item?._id.toString(),
                                                            )?.name ?? ""
                                                        );
                                                    }}
                                                    isOptionEqualToValue={(option, value) => {
                                                        return (
                                                            value === undefined ||
                                                            option?._id?.toString() ===
                                                                value?._id?.toString()
                                                        );
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                name="enzymesNa"
                                                                id="enzymesNa"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.enzymesNa?.message}
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.enzymesNa && (
                                        <FormHelperText error>
                                            {errors.enzymesNa.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack gap="24px">
                                <FormControl>
                                    <FormLabel
                                        sx={{
                                            marginBottom: "8px",
                                            fontWeight: "700",
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Comments
                                    </FormLabel>
                                    <TextField
                                        {...register("enzymesComments", {
                                            maxLength: {
                                                value: 400,
                                                message: "You cannot enter more than 400 characters"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        multiline
                                        minRows={5}
                                        disabled
                                    />
                                    {errors.enzymesComments && (
                                        <FormHelperText error>
                                            {errors.enzymesComments.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion> */}
        </Stack>
    )
}
