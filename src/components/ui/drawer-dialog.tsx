import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import { Drawer, DrawerContent } from "./drawer";
import { Dialog, DialogContent } from "./dialog";
import { useControls } from "@/hooks/store/controls";

type Props = {
  children: React.ReactNode;
};

const DrawerDialog = ({ children }: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { open, setOpen } = useControls();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="max-h-[80dvh] overflow-y-auto">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="max-h-[80dvh] overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DrawerDialog;
