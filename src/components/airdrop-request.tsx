import { zodResolver } from "@hookform/resolvers/zod";
import detectEthereumProvider from "@metamask/detect-provider";
import { useMutation } from "@tanstack/react-query";
import { ethers, toBeHex } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../src/components/ui/form";
import { toast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

const NETWORKS = {
  sepolia: {
    name: "Arbitrum Sepolia Mainnet",
    rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    chainId: 421614,
    blockExplorerUrl: "https://sepolia.arbiscan.io",
    arb_token_contract_address: "0x7Cc1d0980c8D0e248e4F94cf3714F890Dc4F084c",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  arbitrum: {
    name: "Arbitrum One",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
    blockExplorerUrl: "https://arbiscan.io",
    arb_token_contract_address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

const AirdropRequest: React.FC = () => {
  const mutation = useMutation({
    mutationFn: async (newRequest: any) => {
      const response = await fetch(
        "https://airdrops.api.ekonavi.com/api/v1/airdrop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRequest),
        },
      );
      return response.json();
    },
  });

  useEffect(() => {
    // console.log(`mutation`, mutation);
    if (mutation?.data?.success) {
      toast({
        title: mutation?.data?.data.message,
        // description: mutation?.data.message,
        duration: 5000,
        variant: "default",
      });
      setMessage(null);
      setReceipt(
        <div className={`text-center p-3 m-3 rounded-xl border bg-white/20`}>
          <div className={``}>{mutation?.data?.data.message}</div>
          <div className={``}>
            View TX on explorer:{" "}
            <a
              target="_blank"
              className={`underline`}
              href={`${mutation?.data?.data.blockExplorerUrl}/tx/${mutation?.data?.data.tx}`}
            >
              {mutation?.data?.data.tx}
            </a>
          </div>
        </div>,
      );
    } else if (mutation?.data?.error) {
      toast({
        title: "Error",
        description: mutation?.data?.error,
        duration: 5000,
        variant: "destructive",
      });
      setMessage(mutation?.data?.error);
    }
  }, [mutation?.data]);

  const [message, setMessage] = useState<string | null | JSX.Element>(null);
  const [receipt, setReceipt] = useState<string | null | JSX.Element>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null); // Update type to BrowserProvider
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const formSchema = z.object({
    // email: z.coerce
    //   .string({ required_error: "Email is required" })
    //   .email({ message: "Email is invalid" })
    //   .min(5, { message: "Email must be at least 5 characters" }),
    code: z
      .string({ required_error: "Airdrop Code is required" })
      .min(8, { message: "Code must be at least 8 characters" })
      .max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // email: "",
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newRequest = {
      code: values.code,
      // email: values.email,
      recipient: account,
    };
    mutation.mutate(newRequest);
  };

  const metamaskIntialized = useRef(false);
  useEffect(() => {
    const initializeMetaMask = async () => {
      metamaskIntialized.current = true;
      console.log(`initializeMetaMask`);
      const ethereumProvider: any = await detectEthereumProvider();
      if (ethereumProvider) {
        const ethersProvider = new ethers.BrowserProvider(ethereumProvider);
        setProvider(ethersProvider);

        // Request account access if needed
        const accounts = await ethereumProvider.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const signer = await ethersProvider.getSigner(); // Use await here
          setSigner(signer); // Now assign the awaited signer
        }

        // Listen for account changes
        ethereumProvider.on("accountsChanged", async (accounts: string[]) => {
          console.log("Accounts changed:", accounts);
          setAccount(accounts[0]);
          const signer = await ethersProvider.getSigner(); // Use await here
          setSigner(signer);
        });

        // Listen for network changes
        ethereumProvider.on("chainChanged", () => {
          window.location.reload();
        });
      } else {
        console.error("MetaMask is not installed!");
      }
    };

    if (!metamaskIntialized.current) initializeMetaMask();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        const signer = await provider.getSigner(); // Use await here
        setSigner(signer); // Now assign the awaited signer
        switchToArbitrum();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    }
  };

  const switchToArbitrum = async () => {
    if (provider) {
      // await provider.send("eth_requestAccounts", []);
      try {
        const currentChainId = await provider.send("eth_chainId", []);
        const sepoliaChainIdHex = toBeHex(NETWORKS.arbitrum.chainId).replace(
          /^0x0*/,
          "0x",
        );

        if (currentChainId !== sepoliaChainIdHex) {
          await provider.send("wallet_addEthereumChain", [
            {
              chainId: sepoliaChainIdHex,
              chainName: NETWORKS.sepolia.name,
              rpcUrls: [NETWORKS.sepolia.rpcUrl],
              nativeCurrency: NETWORKS.sepolia.nativeCurrency,
              blockExplorerUrls: [NETWORKS.sepolia.blockExplorerUrl],
            },
          ]);
        } else {
          console.log("You are already on the Sepolia network.");
        }
      } catch (error) {
        console.error("Failed to switch to Arbitrum network:", error);
      }
    }
  };

  // useEffect(() => {
  // if (provider && signer) switchToArbitrum();
  // }, [provider, signer]);

  const formInputErrorClassName = `border-red-500 text-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500`;
  const formInputClassName = ``;

  return (
    <Card
      className={`m-2 sm:m-10 overflow-hidden bg-black/10 shadow-2xl drop-shadow-lg border-none `}
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
          Ekonavi + Arbitrum ReFi Airdrop
        </CardTitle>
        <CardDescription className={`text-xl`}>
          Ecological Assets Distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`mb-6 mx-auto flex flex-col items-center w-full  max-w-[480px]`}
        >
          {!account ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <div className={`flex flex-col items-stretch w-full`}>
              <div className={`font-bold text-center py-2 text-lg`}>
                Wallet Connected
              </div>
              <div
                className={`p-3 rounded-lg bg-input w-full text-center overflow-scroll border-4 border-[var(--input)] box-border`}
              >
                {account}
              </div>
            </div>
          )}

          {/* <button onClick={switchToArbitrum}>Switch to Arbitrum Testnet</button> */}
          {account && (
            <div
              className={`flex flex-col items-center justify-center w-full pt-4`}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={` w-full items-center justify-center flex-grow`}
                >
                  {/* <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className={
                              form.formState.errors.email
                                ? formInputErrorClassName
                                : formInputClassName
                            }
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <div className={`text-center p-2 px-10  mx-auto`}>
                    <b>Don't have a code?</b> Login at{" "}
                    <a
                      className={`underline font-bold`}
                      href="https://ekonavi.com/regen?utm_source=arbitrum-airdrop"
                      target="_blank"
                    >
                      Ekonavi.com
                    </a>{" "}
                    then click on '<b>Airdrop Code</b>' in menu.{" "}
                  </div>

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className={cn(
                              "text-2xl p-2 h-auto text-center tracking-widest",
                              form.formState.errors.code
                                ? formInputErrorClassName
                                : formInputClassName,
                            )}
                            placeholder="Enter Airdrop Code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div
                    className={`my-2 flex flex-col items-center justify-center`}
                  >
                    <Button
                      className={`w-full`}
                      type="submit"
                      loading={mutation.isPending}
                    >
                      Receive 5 ARB Tokens
                    </Button>
                  </div>
                  <div
                    className={`text-center flex flex-row items-center text-center justify-center`}
                  >
                    <div className={`w-0 opacity-0`}>i</div>
                    {mutation.isPending ? <div>Requesting...</div> : null}
                    {!mutation.isPending && message ? (
                      <div>{message}</div>
                    ) : null}
                  </div>
                  <div
                    className={`text-center flex flex-row items-center text-center justify-center`}
                  >
                    {receipt ? receipt : null}
                  </div>
                </form>
              </Form>
            </div>
          )}
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

export default AirdropRequest;
