// SPDX-Licensence-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract MultiAirdropDispenser {
    IERC20 public MyToken;
    uint256 public chargesPerAddress = 1e12;

    constructor(address airdroptoken) {
        MyToken = IERC20(airdroptoken);
    }

    function sendTokenout(
        address users,
        uint256 amount
    ) external payable returns (bool) {
        require(users != address(0), "invalid address");
        require(amount > 0, "invalid amount");
        require(MyToken.balanceOf(msg.sender) >= amount, "in");
        require(
            MyToken.transferFrom(msg.sender, address(this), amount),
            "TransferFrom failed"
        );
        require(
            MyToken.balanceOf(address(this)) >= amount,
            "Insuffiecient balance"
        );
        MyToken.transfer(users, amount);
        return true;
    }

    function sendtoMultipleusers(
        address[] memory users,
        uint256[] memory amount
    ) external returns (bool) {
        require(users.length == amount.length, "error");
        require(users.length <= 255, "too many adddress");
        for (uint8 i = 0; i < users.length; i++) {
            require(users[i] != address(0), "invalid address");
            require(amount[i] > 0, "invalid amount");

            require(
                MyToken.balanceOf(msg.sender) >= amount[i],
                "Insuffiecient balance"
            );
            require(
                MyToken.transferFrom(msg.sender, address(this), amount[i]),
                "TransferFrom failed"
            );
            require(
                MyToken.balanceOf(address(this)) >= amount[i],
                "Insuffiecient balance"
            );

            require(MyToken.transfer(users[i], amount[i]));
        }
        return true;
    }

    function TokenName(
        address tokenaddress
    ) public view returns (string memory) {
        return IERC20Metadata(tokenaddress).name();
    }

    function getUserTokenBalance(
        address tokenaddress
    ) public view returns (uint256) {
        return IERC20(tokenaddress).balanceOf(msg.sender);
    }

    function calculateFee(
        uint256 lengthofrecipient
    ) external view returns (uint256) {
        uint256 totalcharge;
        if (lengthofrecipient > 0) {
            totalcharge = chargesPerAddress * lengthofrecipient;
        }
        return totalcharge;
    }

    function getApproval(
        address tokenaddress,
        uint256 amount
    ) public returns (bool) {
        require(
            IERC20(tokenaddress).approve(address(this), amount),
            "Approval failed"
        );
        return true;
    }

    receive() external payable {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        // Mint initial supply to the contract deployer
        _mint(msg.sender, 1000000000000000000000000); // 1,000 tokens with 18 decimals
    }
}
