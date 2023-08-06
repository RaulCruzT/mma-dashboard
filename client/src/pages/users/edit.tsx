import { IResourceComponentsProps } from "@refinedev/core/dist/contexts/resource"
import { useForm } from "@refinedev/react-hook-form";
import { IUser } from "../../interfaces/user";
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { Avatar, Grid, Stack, Typography } from "@mui/material";


export const UsersEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        register,
        control,
        refineCore: { formLoading },
        formState: { errors },
        saveButtonProps,
        setValue,
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
                </Grid>
            </form>
        </Edit>
    )
}
