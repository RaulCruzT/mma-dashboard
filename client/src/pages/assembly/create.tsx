import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IAssembly } from "../../interfaces/assembly";
import { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, FormControl, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { IMyActinobacteria } from "../../interfaces/myactinobacteria";
import { Nullable } from "../../interfaces/utils";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const AssemblyCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm<IMyActinobacteria, HttpError, Nullable<IAssembly>>({
        refineCoreProps: {
            successNotification: () => {
                return {
                    message: 'Successfully created assembly',
                    type: "success",
                };
            },
            errorNotification: () => {
                return {
                    message: 'Error creating an assembly',
                    type: "error",
                }
            }
        }
    });

    const { autocompleteProps: myActinobacteriaAutocompleteProps } = useAutocomplete<IMyActinobacteria>({
        resource: "myactinobacteria",
        onSearch: (value: string) => [
            {
                field: "identifierStrain",
                operator: "contains",
                value
            }
        ]
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Create Assembly</Typography>}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
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
                                    Actinobacteria
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="actinobacteria"
                                    rules={{ required: "required" }}
                                    // eslint-disable-next-line
                                    defaultValue={null as any}
                                    render={({ field }) => (
                                        <Autocomplete
                                            size="small"
                                            disablePortal
                                            {...myActinobacteriaAutocompleteProps}
                                            {...field}
                                            onChange={(_, value) => {
                                                field.onChange(value);
                                            }}
                                            getOptionLabel={(item) => {
                                                return (
                                                    myActinobacteriaAutocompleteProps?.options?.find(
                                                        (p) =>
                                                            p?._id?.toString() ===
                                                            item?._id?.toString(),
                                                    )?.identifierStrain ?? ""
                                                );
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
                                                    variant="outlined"
                                                    error={
                                                        !!errors.actinobacteria
                                                            ?.message
                                                    }
                                                    required
                                                />
                                            )}
                                        />
                                    )}
                                />
                                {errors.actinobacteria && (
                                    <FormHelperText error>
                                        {errors.actinobacteria.message}
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
                                    Sequencing Technology
                                </FormLabel>
                                <TextField
                                    {...register("sequencingTechnology", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.sequencingTechnology && (
                                    <FormHelperText error>
                                        {errors.sequencingTechnology.message}
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
                                    Date
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="date"
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    defaultValue={null as any}
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                {...field}
                                                slotProps={{ textField: { size: 'small' } }}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                                {errors.date && (
                                    <FormHelperText error>
                                        {errors.date.message}
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
                                    BGCs link
                                </FormLabel>
                                <TextField
                                    {...register("bgcs", {
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
                                {errors.bgcs && (
                                    <FormHelperText error>
                                        {errors.bgcs.message}
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
                                    Assembly link
                                </FormLabel>
                                <TextField
                                    {...register("link", {
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
                                {errors.link && (
                                    <FormHelperText error>
                                        {errors.link.message}
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
                                    Software trimming
                                </FormLabel>
                                <TextField
                                    {...register("softwareTrimming", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.softwareTrimming && (
                                    <FormHelperText error>
                                        {errors.softwareTrimming.message}
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
                                    Software assembly
                                </FormLabel>
                                <TextField
                                    {...register("softwareAssembly", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.softwareAssembly && (
                                    <FormHelperText error>
                                        {errors.softwareAssembly.message}
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
                                    Parameters assembly
                                </FormLabel>
                                <TextField
                                    {...register("parametersAssembly", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.parametersAssembly && (
                                    <FormHelperText error>
                                        {errors.parametersAssembly.message}
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
                                    Quality final
                                </FormLabel>
                                <TextField
                                    {...register("qualityFinal", {
                                        required: {
                                            value: true,
                                            message: "required"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        }
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.qualityFinal && (
                                    <FormHelperText error>
                                        {errors.qualityFinal.message}
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
                                    {...register("comments", {
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
                                {errors.comments && (
                                    <FormHelperText error>
                                        {errors.comments.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Create>
    )
}