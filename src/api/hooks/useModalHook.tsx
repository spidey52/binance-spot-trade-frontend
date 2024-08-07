import { useState } from "react";

type ModalHook = {
 initial: boolean;
};

const initialState = {
 initial: false,
};

const useModalHook = ({ initial }: ModalHook = initialState) => {
 const [open, setOpen] = useState(initial);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 return { open, handleOpen, handleClose };
};

export default useModalHook;
