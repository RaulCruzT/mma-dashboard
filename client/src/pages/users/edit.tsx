import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource"
import { useForm } from "@refinedev/react-hook-form";
import { IUser } from "../../interfaces/user";
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { Autocomplete, Avatar, FormControl, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";


export const UsersEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        control,
        refineCore: { formLoading, queryResult },
        formState: { errors },
        saveButtonProps,
    } = useForm<IUser, HttpError, IUser>();

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
                >
                    <Grid mb={1} item xs={12} md={4}>
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar
                                src={queryResult?.data?.data.avatar}
                                alt={queryResult?.data?.data.name}
                                sx={{
                                    width: {
                                        xs: 180,
                                        lg: 256,
                                    },
                                    height: {
                                        xs: 180,
                                        lg: 256,
                                    },
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                                    Name
                                </FormLabel>
                                <TextField
                                    {...register("name")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    disabled
                                />
                                {errors.name && (
                                    <FormHelperText error>
                                        {errors.name.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
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
                                    Email
                                </FormLabel>
                                <TextField
                                    {...register("email")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    disabled
                                />
                                {errors.email && (
                                    <FormHelperText error>
                                        {errors.email.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    Role
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="role"
                                    rules={{
                                        required: "required",
                                    }}
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
                                                "user",
                                                "manager",
                                                "admin",
                                            ]}
                                            renderInput={(
                                                params,
                                            ) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    error={
                                                        !!errors.role
                                                    }
                                                    required
                                                />
                                            )}
                                        />
                                    )}
                                />
                                {errors.role && (
                                    <FormHelperText error>
                                        {errors.role.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Edit>
    )
}
