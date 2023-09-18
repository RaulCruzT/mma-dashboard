import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource";
import { useForm } from "@refinedev/react-hook-form";
import { IGenera } from "../../interfaces/genera";
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { FormControl, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { stringFormat } from "../../utils/stringFormat";

export const GeneraEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        refineCore: { formLoading },
        formState: { errors },
        saveButtonProps,
    } = useForm<IGenera, HttpError, IGenera>();

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps} title={<Typography variant="h5">Edit Genera</Typography>}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
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
                                    Name
                                </FormLabel>
                                <TextField
                                    {...register("name", {
                                        required: true,
                                        maxLength: {
                                            value: 100,
                                            message: "You cannot enter more than 100 characters"
                                        },
                                        setValueAs: v => stringFormat(v)
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    inputProps={{ style: { textTransform: "lowercase" } }}
                                />
                                {errors.name && (
                                    <FormHelperText error>
                                        {errors.name.message}
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
