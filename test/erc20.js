const DDATE = artifacts.require("DDATE");

contract('DDATE', (accounts) => {
  it('should put 10000 DDates in the first account', async () => {
    const ddateInstance = await DDATE.deployed();
    const balance = await ddateInstance.balanceOf.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");

  });

  it('should send coin first method correctly', async() => {
    const ddateInstance = await DDATE.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    await ddateInstance.approve(accountTwo, 10, {from: accountOne});

    const accountOneStartingBalance = (await ddateInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ddateInstance.balanceOf.call(accountTwo)).toNumber();

    const amount = 10;
    await ddateInstance.transferFrom(accountOne, accountTwo, 10, {from: accountTwo});

    const accountOneEndingBalance = (await ddateInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ddateInstance.balanceOf.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });

  it('should send coin second method correctly', async() => {
    const ddateInstance = await DDATE.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    const accountOneStartingBalance = (await ddateInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ddateInstance.balanceOf.call(accountTwo)).toNumber();

    const amount = 10;

    await ddateInstance.transfer(accountTwo, 10, {from: accountOne});

    const accountOneEndingBalance = (await ddateInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ddateInstance.balanceOf.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");


  });
  it('see private information', async() => {
    const ddateInstance = await DDATE.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    await ddateInstance.transfer(accountTwo, 100, {from: accountOne});

    await ddateInstance.buySeeAge({from: accountTwo});

    const accountTwoCanSeAge = (await ddateInstance.canSeAge.call(accountTwo));

    assert.equal(accountTwoCanSeAge, true, 'Cannot see');
  });

  it('can buy token?', async() => {
    const ddateInstance = await DDATE.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    const accountOneStartingBalance = (await ddateInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ddateInstance.balanceOf.call(accountTwo)).toNumber();

    await ddateInstance.buyToken(10, {from: accountTwo,
      to: accountOne,
             value: web3.utils.toWei("10", "ether"),
             gas: "4712388"
    });

    const amount = 10;

    const accountOneEndingBalance = (await ddateInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ddateInstance.balanceOf.call(accountTwo)).toNumber();

    await ddateInstance.buySeeAge({from:accountTwo});

    const accountTwoCanSeAge = (await ddateInstance.canSeAge.call(accountTwo));

    assert.equal(accountTwoCanSeAge, true, "account can see now");
    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
