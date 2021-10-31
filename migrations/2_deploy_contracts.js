var DDATE = artifacts.require("DDATE");
var DDATE_0 = artifacts.require("DDATE_0");
var DDATE_1 = artifacts.require("DDATE_1");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(DDATE, 'CAR','CAR', {from: accounts[0]});
  deployer.deploy(DDATE_0, 'GEO', 'GEO', {from: accounts[1]});
  deployer.deploy(DDATE_1, 'SAM', 'SAM', {from: accounts[2]});
}
