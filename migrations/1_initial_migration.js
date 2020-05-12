const Migrations = artifacts.require("Migrations");
const Voter = artifacts.require("Voter");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Voter);
};
