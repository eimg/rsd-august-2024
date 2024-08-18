import { useAppContext } from "./ThemedApp";

import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, } from "@mui/material";

import { Delete as DeleteIcon } from "@mui/icons-material";

export default function Item({ item, remove }) {
    const { mode } = useAppContext();

	return <ListItem>
        <ListItemText primary={item.content} />
        <ListItemSecondaryAction>
            <IconButton onClick={() => remove(item.id)}>
                <DeleteIcon color="error" />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>;
}
