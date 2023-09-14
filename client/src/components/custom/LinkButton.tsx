import { IconButton, Typography } from "@mui/material";
import {
    OpenInNew
} from "@mui/icons-material";

interface LinkButtonProps {
    href: string | undefined;
}

const isValidUrl = (urlString: string): boolean => {
    let url;

    try { 
        url =new URL(urlString); 
    }
    catch(e){ 
        return false; 
    }
    
    return url.protocol === "http:" || url.protocol === "https:";
}

export const LinkButton = ({ href }: LinkButtonProps) => {
    return (
        href && isValidUrl(href) ? 
        <IconButton color="primary" target="_blank" href={href}>
            <OpenInNew />
        </IconButton>
        :
        <Typography>
            No link provided
        </Typography>
    )
};
