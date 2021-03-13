 pragma solidity ^0.4.22; //update to 9 eveT(a)

contract UwUcoin {
  string public name = "UwU Coin";
  string public symbol = "UWU";
  string public standard = "UwU Coin v1.0";
  uint256 public totalSupply;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  function UwUcoin (uint256 _initalSupply) public {
    balanceOf[msg.sender] = _initalSupply;
    totalSupply = _initalSupply;
  }
  function transfer(address _to, uint256) public {
    require(balanceOf[msg.sender] >= _value);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    Transfer(msg.sender, _to, _value);

    return true;
  }
}
