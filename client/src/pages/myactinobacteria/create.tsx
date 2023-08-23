import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IMyActinobacteria } from "../../interfaces/myactinobacteria";
import { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, FormControl, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import {
    ExpandMore
} from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { IGenera } from "../../interfaces/genera";

export const MyActinobacteriaCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        formState: { errors },
        saveButtonProps,
        control
    } = useForm<IMyActinobacteria, HttpError, IMyActinobacteria>();

    const { autocompleteProps } = useAutocomplete<IGenera>({
        resource: "genera",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Identification</Typography>
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
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Strain
                                        </FormLabel>
                                        <TextField
                                            {...register("identifierStrain", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.identifierStrain && (
                                            <FormHelperText error>
                                                {errors.identifierStrain.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                <FormControl sx={{ marginTop: "10px" }}>
                                    <Controller
                                        control={control}
                                        name="identifierGenera"
                                        // eslint-disable-next-line
                                        defaultValue={null as any}
                                        render={({ field }) => (
                                            <Autocomplete
                                                disablePortal
                                                {...autocompleteProps}
                                                {...field}
                                                onChange={(_, value) => {
                                                    field.onChange(value);
                                                }}
                                                getOptionLabel={(item) => {
                                                    return item.name
                                                        ? item.name
                                                        : autocompleteProps?.options?.find(
                                                            (p) =>
                                                                p._id.toString() ===
                                                                item.toString(),
                                                        )?.name ?? "";
                                                }}
                                                isOptionEqualToValue={(
                                                    option,
                                                    value,
                                                ) =>
                                                    value === undefined ||
                                                    option?._id?.toString() ===
                                                        (
                                                            value?._id ?? value
                                                        )?.toString()
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Genera"
                                                        variant="outlined"
                                                        error={
                                                            !!errors.identifierGenera
                                                                ?.message
                                                        }
                                                        required
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                    {errors.identifierGenera && (
                                        <FormHelperText error>
                                            {errors.identifierGenera.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
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
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Isolation site
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyIsolationSite", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.geographyIsolationSite && (
                                            <FormHelperText error>
                                                {errors.geographyIsolationSite.message}
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
                                            Coordinates
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyCoordinates", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.geographyCoordinates && (
                                            <FormHelperText error>
                                                {errors.geographyCoordinates.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Isolation source
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyIsolationSource", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.geographyIsolationSource && (
                                            <FormHelperText error>
                                                {errors.geographyIsolationSource.message}
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
                                            Altitude (m.a.s.l)
                                        </FormLabel>
                                        <TextField
                                            {...register("geographyAltitude", {
                                                required: false
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                        />
                                        {errors.geographyAltitude && (
                                            <FormHelperText error>
                                                {errors.geographyAltitude.message}
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
                                            {...register("geographyComments", {
                                                required: false,
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
                                        />
                                        {errors.geographyComments && (
                                            <FormHelperText error>
                                                {errors.geographyComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
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
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Medium
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationMedium", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.isolationMedium && (
                                            <FormHelperText error>
                                                {errors.isolationMedium.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Temperature (°C)
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationTemperature", {
                                                required: true,
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="number"
                                        />
                                        {errors.isolationTemperature && (
                                            <FormHelperText error>
                                                {errors.isolationTemperature.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Method
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationMethod", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.isolationMethod && (
                                            <FormHelperText error>
                                                {errors.isolationMethod.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Person in charge
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationResponsible", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.isolationResponsible && (
                                            <FormHelperText error>
                                                {errors.isolationResponsible.message}
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
                                            Thesis/Paper
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationThesisPaper", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                        />
                                        {errors.isolationThesisPaper && (
                                            <FormHelperText error>
                                                {errors.isolationThesisPaper.message}
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
                                            Thesis/Paper link
                                        </FormLabel>
                                        <TextField
                                            {...register("isolationThesisPaperLink", {
                                                required: false,
                                                maxLength: {
                                                    value: 400,
                                                    message: "You cannot enter more than 400 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
                                        {errors.isolationThesisPaperLink && (
                                            <FormHelperText error>
                                                {errors.isolationThesisPaperLink.message}
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
                                            {...register("isolationComments", {
                                                required: false,
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
                                        />
                                        {errors.isolationComments && (
                                            <FormHelperText error>
                                                {errors.isolationComments.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
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
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12} md={6}>
                                <Stack gap="24px">
                                    <FormControl>
                                        <FormLabel
                                            required
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
                                                            required
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
                                            required
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
                                            {...register("arnr16sSize", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
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
                                            required
                                            sx={{
                                                marginBottom: "8px",
                                                fontWeight: "700",
                                                fontSize: "14px",
                                                color: "text.primary",
                                            }}
                                        >
                                            Sequence file link
                                        </FormLabel>
                                        <TextField
                                            {...register("arnr16sSequenceFile", {
                                                required: true,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
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
                                        <TextField
                                            {...register("arnr16sMacrogenFile", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
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
                                                required: false,
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
                        <Typography>
                            Characterization
                        </Typography>
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
                                        <TextField
                                            {...register("genomeRawData", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
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
                                                required: false,
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
                        <Typography>
                            Bioactivity
                        </Typography>
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
                                        <TextField
                                            {...register("metabolomicsMedinaFoundationReports", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
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
                                        <TextField
                                            {...register("metabolomicsRawData", {
                                                required: false,
                                                maxLength: {
                                                    value: 100,
                                                    message: "You cannot enter more than 100 characters"
                                                }
                                            })}
                                            size="small"
                                            margin="none"
                                            variant="outlined"
                                            type="url"
                                        />
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
                                                required: false,
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
                        <Typography>
                            Enzymes
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </form>
        </Create>
    )
}
