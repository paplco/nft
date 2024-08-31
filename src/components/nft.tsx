import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import NftMDX from "./nft.mdx";

import { useEffect } from "react";
const NFT: React.FC = () => {
  useEffect(() => {
    window.history.pushState({}, "", "/cohort1");
  }, []);
  return (
    <Card
      className={`m-2 sm:m-10 overflow-hidden bg-white/40 shadow-2xl drop-shadow-lg border-none `}
    >
      <CardHeader className={`flex flex-col items-center justify-center`}>
        <div
          className={`grid sm:grid-cols-[70%,1fr] gap-3 flex flex-col items-center justify-center`}
        >
          <div className={`flex flex-col items-start justify-start`}>
            {" "}
            <img
              className={`w-full h-[70px]`}
              src="/images/EKONAVI-agrofloresta-marca-logo.svg"
              alt="logo"
            />
          </div>
          <div
            className={` w-[120px] h-[120px] rounded-2xl overflow-hidden flex flex-col items-center justify-center mx-auto`}
          >
            {" "}
            <img
              className={` object-contain w-full h-full`}
              src="/images/arbitrum-refi.jpg"
              alt="logo"
            />
          </div>
        </div>
        <CardTitle className={`text-2xl`}>
          Ekonavi + Arbitrum ReFi NFT Launch
        </CardTitle>
        <CardDescription className={`text-xl`}>
          Ecological Asset Tracking & Market Economies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`mb-6 mx-auto flex flex-col w-full prose prose-invert bg-whiet`}
        >
          <NftMDX />
        </div>
      </CardContent>
      <CardFooter
        className={`text-center text-xs flex flex-row items-center justify-center leading-none`}
      >
        &copy; {new Date().getFullYear()} Ekonavi, Inc.{" "}
        <a
          className={`underline pl-1`}
          href="https://ekonavi.com/?utm_source=arbitrum-airdrop"
          target="_blank"
        >
          Ekonavi.com
        </a>
      </CardFooter>
    </Card>
  );
};

export default NFT;
