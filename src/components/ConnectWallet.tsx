"use client";
import { useAccount, useConnect } from "wagmi";

export default function ConnectWallet() {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  console.log(connectors);

  return (
    <>
      {isConnected && <div>Connected to {activeConnector?.name}</div>}

      {connectors.map((connector) => (
        <button
          className=" px-5 py-4 bg-white grid place-items-center rounded-lg"
        //   disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </>
  );
}
