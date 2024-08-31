import { LoaderCircle } from "lucide-react";

import { twMerge } from "tailwind-merge";
export const Loader = ({ className }: { className?: string }) => {
  //   const appInitialized = useStore((state) => state.appInitialized);
  // let appInitialized = true;
  return (
    <LoaderCircle
      className={twMerge(
        "animate-spin text-white transition border",
        className,
        // appInitialized ? "text-primary" : "",
      )}
    />
  );
};
