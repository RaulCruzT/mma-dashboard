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
            {/* <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>rRNA 16S</Typography>
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
                                        Completeness
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="arnr16sCompleteness"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Complete",
                                                    "Partial",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.arnr16sCompleteness
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.arnr16sCompleteness && (
                                        <FormHelperText error>
                                            {errors.arnr16sCompleteness.message}
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
                                        Size (?)
                                    </FormLabel>
                                    <TextField
                                        {...register("arnr16sSize")}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{ inputProps: { step: step}}}
                                        disabled
                                    />
                                    {errors.arnr16sSize && (
                                        <FormHelperText error>
                                            {errors.arnr16sSize.message}
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
                                        Sequence file link
                                    </FormLabel>
                                    <LinkButton href={queryResult?.data?.data.arnr16sSequenceFile} />
                                    {errors.arnr16sSequenceFile && (
                                        <FormHelperText error>
                                            {errors.arnr16sSequenceFile.message}
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
                                        Macrogen file link
                                    </FormLabel>
                                    <LinkButton href={queryResult?.data?.data.arnr16sMacrogenFile} />
                                    {errors.arnr16sMacrogenFile && (
                                        <FormHelperText error>
                                            {errors.arnr16sMacrogenFile.message}
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
                                        {...register("arnr16sComments", {
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
                                    {errors.arnr16sComments && (
                                        <FormHelperText error>
                                            {errors.arnr16sComments.message}
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
                    <Typography>Characterization</Typography>
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
                                        Growing media
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationGrowingMedia"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = characterizationGrowingMediaAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...characterizationGrowingMediaAutocompleteProps}
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
                                                            characterizationGrowingMediaAutocompleteProps?.options?.find(
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
                                                                name="characterizationGrowingMedia"
                                                                id="characterizationGrowingMedia"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.characterizationGrowingMedia?.message}
                                                                disabled
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.characterizationGrowingMedia && (
                                        <FormHelperText error>
                                            {errors.characterizationGrowingMedia.message}
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
                                        Not growing media
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationNotGrowingMedia"
                                        defaultValue={[]}
                                        render={({ field }) => {
                                            const newValue = characterizationNotGrowingMediaAutocompleteProps.options.filter(
                                                (p) =>
                                                    field.value?.find((v) => v === p?._id) !==
                                                    undefined,
                                            );

                                            return (
                                                <Autocomplete
                                                    {...characterizationNotGrowingMediaAutocompleteProps}
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
                                                            characterizationNotGrowingMediaAutocompleteProps?.options?.find(
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
                                                                name="characterizationNotGrowingMedia"
                                                                id="characterizationNotGrowingMedia"
                                                                margin="normal"
                                                                variant="outlined"
                                                                error={!!errors.characterizationNotGrowingMedia?.message}
                                                                disabled
                                                            />
                                                        );
                                                    }}
                                                    readOnly={true}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.characterizationNotGrowingMedia && (
                                        <FormHelperText error>
                                            {errors.characterizationNotGrowingMedia.message}
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
                                        Mycelial
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationMycelial"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Yes",
                                                    "No",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationMycelial
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationMycelial && (
                                        <FormHelperText error>
                                            {errors.characterizationMycelial.message}
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
                                        Day of appearance of the first colonies
                                    </FormLabel>
                                    <TextField
                                        {...register("characterizationColoniesDay", {
                                            min: {
                                                value: 0,
                                                message: "You cannot enter a number less than 0"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        type="number"
                                        disabled
                                    />
                                    {errors.characterizationColoniesDay && (
                                        <FormHelperText error>
                                            {errors.characterizationColoniesDay.message}
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
                                        Sporulation start day
                                    </FormLabel>
                                    <TextField
                                        {...register("characterizationSporulationDay", {
                                            min: {
                                                value: 0,
                                                message: "You cannot enter a number less than 0"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        type="number"
                                        disabled
                                    />
                                    {errors.characterizationSporulationDay && (
                                        <FormHelperText error>
                                            {errors.characterizationSporulationDay.message}
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
                                        Biomass collection day
                                    </FormLabel>
                                    <TextField
                                        {...register("characterizationBiomassDay", {
                                            min: {
                                                value: 0,
                                                message: "You cannot enter a number less than 0"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        type="number"
                                        disabled
                                    />
                                    {errors.characterizationBiomassDay && (
                                        <FormHelperText error>
                                            {errors.characterizationBiomassDay.message}
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
                                        Shape
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationShape"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Circular",
                                                    "Fusiform",
                                                    "Rhizoid",
                                                    "Filamentous",
                                                    "Irregular",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationShape
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationShape && (
                                        <FormHelperText error>
                                            {errors.characterizationShape.message}
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
                                        Border (margin of the colony)
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationBorder"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Complete",
                                                    "Rhizoid",
                                                    "Filamentous",
                                                    "Wavy",
                                                    "Lobed",
                                                    "Curly",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationBorder
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationBorder && (
                                        <FormHelperText error>
                                            {errors.characterizationBorder.message}
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
                                        Elevation
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationElevation"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Flat",
                                                    "Convex",
                                                    "Elevated",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationElevation
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationElevation && (
                                        <FormHelperText error>
                                            {errors.characterizationElevation.message}
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
                                        Surface
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationSurface"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Smooth",
                                                    "Rough",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationSurface
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationSurface && (
                                        <FormHelperText error>
                                            {errors.characterizationSurface.message}
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
                                        Color
                                    </FormLabel>
                                    <TextField
                                        {...register("characterizationColor", {
                                            maxLength: {
                                                value: 100,
                                                message: "You cannot enter more than 100 characters"
                                            }
                                        })}
                                        size="small"
                                        margin="none"
                                        variant="outlined"
                                        disabled
                                    />
                                    {errors.characterizationColor && (
                                        <FormHelperText error>
                                            {errors.characterizationColor.message}
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
                                        Transparency
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationTransparency"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Opaque",
                                                    "Transparent",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationTransparency
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationTransparency && (
                                        <FormHelperText error>
                                            {errors.characterizationTransparency.message}
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
                                        Brightness
                                    </FormLabel>
                                    <Controller
                                        control={control}
                                        name="characterizationBrightness"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                size="small"
                                                {...field}
                                                onChange={(
                                                    _,
                                                    value,
                                                ) => {
                                                    field.onChange(
                                                        value,
                                                    );
                                                }}
                                                options={[
                                                    "Bright",
                                                    "Without bright",
                                                ]}
                                                renderInput={(
                                                    params,
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        error={
                                                            !!errors.characterizationBrightness
                                                        }
                                                        disabled
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.characterizationBrightness && (
                                        <FormHelperText error>
                                            {errors.characterizationBrightness.message}
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
                                        {...register("characterizationComments", {
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
                                    {errors.characterizationComments && (
                                        <FormHelperText error>
                                            {errors.characterizationComments.message}
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
