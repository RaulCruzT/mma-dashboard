import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource"
import { useForm } from "@refinedev/react-hook-form";
import { ICultureMedium } from "../../interfaces/culturemedium";
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { FormControl, FormHelperText, FormLabel, Grid, Stack, TextField } from "@mui/material";
import { stringToLowerCase } from "../../utils/stringToLowerCase.ts";

export const CultureMediumEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        refineCore: { formLoading },
        formState: { errors },
        saveButtonProps,
    } = useForm<ICultureMedium, HttpError, ICultureMedium>();

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
                                    {...register("name", {required: true, minLength: 1, maxLength: 30, setValueAs: v => stringToLowerCase(v)})}
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
