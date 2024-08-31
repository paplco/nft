import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Nft from "./components/nft";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className="">
        <QueryClientProvider client={queryClient}>
          <Nft />
        </QueryClientProvider>

        <Toaster />
      </div>
    </>
  );
}

export default App;
