pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DDATE.sol";

contract TestDDATE {
  DDATE ddate = DDATE(DeployedAddresses.DDATE());

  function testBalance() public {
    uint expected = 10000;
    Assert.equal(ddate.balanceOf(tx.origin), expected, 'Owver should have 10000 coin initially');
  }

  function testName() public {
    string memory expected = "CAR";
    Assert.equal(ddate.name(), expected, 'Name is CAR');
  }

  function testAge() public {
    uint expected = 22;
    Assert.equal(ddate.age(), expected, "Age is 22");
  }

}
