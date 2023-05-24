"use client";
import { usePolybase } from "@/hooks/polybase";
import { useAccount, useConnect } from "wagmi";

export default function ConnectWallet() {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { auth, loggedIn } = usePolybase();

  const handleConnect = async (connector: any) => {
    !isConnected && connect({ connector });
    isConnected && (await auth());
  };

  return (
    <>
      {/* {isConnected && <div>Connected to {activeConnector?.name}</div>} */}

      {connectors.map((connector) => (
        <button
          className=" px-5 py-4 bg-white grid place-items-center rounded-lg"
          //   disabled={!connector.ready}
          key={connector.id}
          onClick={async () => await handleConnect(connector)}
        >
          {loggedIn && isConnected ? (
            <p className=" text-[#050505] font-semibold">Profile</p>
          ) : (
            <p className=" text-[#050505] font-semibold">Login</p>
          )}

          {isLoading &&
            pendingConnector?.id === connector.id &&
            " (connecting)"}
        </button>
      ))}

      {/* {error && <div>{error.message}</div>} */}
    </>
  );
}
