import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource"
import { useForm } from "@refinedev/react-hook-form";
import { IEnzyme } from "../../interfaces/enzyme";
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { FormControl, FormHelperText, FormLabel, Grid, Stack, TextField } from "@mui/material";
import { stringToLowerCase } from "../../utils/stringToLowerCase.ts";

export const EnzymeCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        formState: { errors },
        saveButtonProps,
    } = useForm<IEnzyme, HttpError, IEnzyme>();

    return (
        <Create saveButtonProps={saveButtonProps}>
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
                                        setValueAs: v => stringToLowerCase(v)
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
        </Create>
    )
}
