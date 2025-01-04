import { Devtools } from "@/providers/dev-only";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ScrollArea, Toaster } from "@tape.xyz/winder";
import { ThemeProvider } from "@tape.xyz/winder";
import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";
import { Log } from "./log";
import { rqClient, rqPersister } from "./react-query";
import { ServiceWorkerProvider } from "./sw-provider";
import { WalletProvider } from "./wallet";

const loadFeatures = () => import("./animations").then((res) => res.default);

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ScrollArea className="h-screen">
      <PersistQueryClientProvider
        client={rqClient}
        persistOptions={{ persister: rqPersister }}
      >
        <WalletProvider>
          <ServiceWorkerProvider>
            <LazyMotion features={loadFeatures} strict>
              <ThemeProvider>
                {children}
                <Toaster />
              </ThemeProvider>
              <Log />
              <Devtools />
            </LazyMotion>
          </ServiceWorkerProvider>
        </WalletProvider>
      </PersistQueryClientProvider>
    </ScrollArea>
  );
};
