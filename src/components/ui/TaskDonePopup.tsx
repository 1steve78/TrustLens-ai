"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";

export default function TaskDonePopup({
  open,
  onClose,
  title = "Done",
  description,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description: string;
}) {
  // auto-close after 2s
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 border border-white/10 w-[90vw] max-w-sm text-center">
          <Dialog.Title className="text-lg font-semibold">
            {title}
          </Dialog.Title>

          <Dialog.Description className="text-sm text-gray-400 mt-2">
            {description}
          </Dialog.Description>

          <button
            onClick={onClose}
            className="mt-5 w-full rounded-xl px-4 py-2 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
          >
            OK
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
