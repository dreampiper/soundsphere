// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoundSpherePlatform is Ownable {
    struct Artist {
        address artistAddress;
        address daoAddress;
        uint256 totalPlays;
    }

    mapping(address => Artist) public artists;
    address[] public artistAddresses;
    mapping(address => uint256) public listenerSubscription;
    IERC20 public soundSphereToken;

    uint256 public totalPlays;
    uint256 public subscriptionFee;

    event ArtistRegistered(address indexed artist, address indexed dao);
    event SubscriptionPurchased(address indexed listener, uint256 amount);
    event MusicPlayed(address indexed artist);
    event RevenueDistributed();

    constructor(IERC20 _soundSphereToken, uint256 _subscriptionFee) {
        soundSphereToken = _soundSphereToken;
        subscriptionFee = _subscriptionFee;
    }

    function registerArtist(
        address _artistAddress,
        address _daoAddress
    ) external {
        artists[_artistAddress] = Artist(_artistAddress, _daoAddress, 0);
        artistAddresses.push(_artistAddress);
        emit ArtistRegistered(_artistAddress, _daoAddress);
    }

    function purchaseSubscription() external {
        soundSphereToken.transferFrom(
            msg.sender,
            address(this),
            subscriptionFee
        );
        listenerSubscription[msg.sender] = block.timestamp + 30 days;
        emit SubscriptionPurchased(msg.sender, subscriptionFee);
    }

    function playMusic(address _artistAddress) external {
        require(
            listenerSubscription[msg.sender] >= block.timestamp,
            "Subscription expired, support your fave artists and purchase a new subscription!"
        );
        artists[_artistAddress].totalPlays += 1;
        totalPlays += 1;
        emit MusicPlayed(_artistAddress);
    }

    function distributeRevenue() external {
        uint256 totalRevenue = soundSphereToken.balanceOf(address(this));
        for (uint256 i = 0; i < artistAddresses.length; i++) {
            address artistAddress = artistAddresses[i];
            Artist storage artist = artists[artistAddress];
            uint256 artistShare = (totalRevenue * artist.totalPlays * 80) /
                (totalPlays * 100);
            uint256 daoShare = (totalRevenue * artist.totalPlays * 20) /
                (totalPlays * 100);
            soundSphereToken.transfer(artist.artistAddress, artistShare);
            soundSphereToken.transfer(artist.daoAddress, daoShare);
        }
        emit RevenueDistributed();
    }
}
