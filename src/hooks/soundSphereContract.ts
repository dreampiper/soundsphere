import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

const useSoundSphereContract = () => {
  const address = process.env
    .NEXT_PUBLIC_SOUNDSPHERE_PLATFORM_ADDRESS as Address;
  const abi = [
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "_soundSphereToken",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_subscriptionFee",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "artist",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "dao",
          type: "address",
        },
      ],
      name: "ArtistRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "artist",
          type: "address",
        },
      ],
      name: "MusicPlayed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "RevenueDistributed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "listener",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "SubscriptionPurchased",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "artistAddresses",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "artists",
      outputs: [
        {
          internalType: "address",
          name: "artistAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "daoAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "totalPlays",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "distributeRevenue",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "listenerSubscription",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_artistAddress",
          type: "address",
        },
      ],
      name: "playMusic",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "purchaseSubscription",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_artistAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_daoAddress",
          type: "address",
        },
      ],
      name: "registerArtist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "soundSphereToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "subscriptionFee",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalPlays",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;

  // const { config: registerArtistConfig } = usePrepareContractWrite({
  //   address,
  //   abi,
  //   functionName: "registerArtist",
  //   onError(error) {
  //     console.log("Error", error);
  //   },
  //   onSuccess(data) {
  //     console.log("Success", data);
  //   },
  // });
  const registerArtist = useContractWrite({
    address,
    abi,
    functionName: "registerArtist",
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return { registerArtist };
};

export default useSoundSphereContract;
