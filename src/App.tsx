import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AirdropRequest from "./components/airdrop-request";
import { Toaster } from "./components/ui/toaster";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className="">
        <QueryClientProvider client={queryClient}>
          <AirdropRequest />
        </QueryClientProvider>

        <Toaster />
      </div>
    </>
  );
}

export default App;
