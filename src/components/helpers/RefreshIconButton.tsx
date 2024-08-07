import { Pending, Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
 isLoading: boolean;
 onClick: () => void;
};

const RefreshIconButton = ({ isLoading, onClick }: Props) => {
 return <IconButton onClick={onClick}>{isLoading ? <Pending /> : <Refresh />}</IconButton>;
};

export default RefreshIconButton;
