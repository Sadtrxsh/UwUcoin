pragma solidity ^0.4.22;

contract UwUcoin {
  string public name = "UwU Coin";
  string public symbol = "UWU";
  string public standard = "UwU Coin v1.0";
  uint256 public totalSupply;

  //event Transfer(
    //address indexed _from,
    //address indexed _to,
    //uint _value
  //);

  //event Approval(
    //address indexed _owner,
    //address indexed _spender,
    //uint256 _value
  //);

  //mapping(address => uint256) public balanceOf;
  //mapping(address => mapping(address => uint256)) public allowance;

  function UwUcoin () public {
    //balanceOf[msg.sender] = _initalSupply;
    totalSupply = 1000000; //_initalSupply;
  }
}
