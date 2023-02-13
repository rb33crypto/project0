// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC721{
    funtion transferFrom(address _from , address _to , uint256 _id ) external;
}


contract Escrow{
    address public nftAddress;
    uint256 public nftID;
    uint256 public purchasePrice;
    uint256 public escrowAmount;
    address payable public seller;
    address payable public buyer;
    address public inspector;
    address public lender;

    modifier onlyBuyer(){
        require(msg.sender == buyer, "only buyer can call this function");
        _;
       }
    
    modifier onlyInspector(){
        require(msg.sender == inspector, "only inspect can call function")
        _;
    }

    bool public inspectionPassed = false;
    mapping(address => bool) public approval;

    recieve() external payable{

    }

   constructor(
    address _nftAddress,
     uint256 _nftID,
     uint256 _purchasePrice,
     uint256 _escrowAmount,
     address payable _seller,
     address payable _buyer,
     address _inspector,
     address _lender
    ){
        nftAddress = _nftAddress;
        nftID = _nftID;
        purchasePrice = _purchasePrice;
        escrowAmount = _escrowAmount;
        seller = _seller;
        buyer = _buyer;
        inspector = _inspector;
        lender = _lender;
   }


   }
   
   function depositEarnest() public payable onlyBuyer {
        require(msg.value >= escrowAmount);
   }

   function updateInspection(bool _passed) public onlyInspector{
    inspectionPassed = _passed;
   }

   function approveSale() public{
    approval[msg.sender] = true;
   }


   function getBalance() public view returns (uint){
    return address(this).balance;
   }

   function finalizeSale() public{
        require(inspectionPassed);
        require(approval[buyer]);
        require(approval[seller]);
        require(approval[lender]);
        require(address(this).balance >= purchasePrice);

        (bool success, ) = payable(seller).call{value: address(this).balance} ("");
        require(success);
        
        //transfer ownership of property
        IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }


}