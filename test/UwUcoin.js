var UwUcoin = artifacts.require("./UwUcoin.sol");

contract('UwUcoin', function(accounts) {
  var tokenInstance

  it('init contract w/ valid values', function() {
    return UwUcoin.deployed().then(function(instance) {
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name) {
      assert.equal(name, 'UwU Coin', 'isValid name');
      return tokenInstance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol, 'UWU', 'isValid symbol');
      return tokenInstance.standard();
    }).then(function(standard) {
      assert.equal(standard, 'UwU Coin v1.0', 'isValid standard');
    });
  })

  it('allocate init supply w/ deployment' function() {
    return UwUcoin.deployed().then(function(instance) {
      tokenInstance= instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), 6900000, 'totalSupply = 6.9mill');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance) {
      assert.equal(adminBalance.toNumber(), 6900000, 'allocate pSupply to admin');
    });
  });

  it('transferToken owner', function() {
    return UwUcoin.deployed().then(function(instance) {
      //test 'require' by transfer larger then balanceOf.sender
      return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'errmsg == revert');
      return tokenInstance.transfer.call(accounts[1], 1725000, { from accounts[0]});
    }).then(function(success) {
      assert.equal(success, true, 'return true');
      return tokenInstance.transfer.call(accounts[1], 1725000, { from: accounts[0] });
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1 , 'event.trigger');
      assert.equal(receipt.logs[0].event, 'transfer', '== transfer event');
      assert.equal(receipt.logs[0].args._from, accounts[0], 'logs.transferToken._from')
      assert.equal(receipt.logs[0].args._to, accounts[1], 'logs.tansfer.amount');
      return tokenInstance.balanceOf(accounts[1])
    }).then(function(balance) {
      assert.equal(receipt.logs[0]._value, 1725000, 'receive.amount.recieved');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 5175000, 'rm * transfer.amount from sender.account');
    });
  });
  it('handler delegated transferTokens', function() {
    return UwUcoin.deployed().then(function(instance) {
      tokenInstance = instance;
      fromAccount = accounts[2];
      toAccount = accounts[3];
      spendingAccount = accounts[4];

      //transferToken _to fromAccount
      return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
    }).then(function(receipt) {
      //approved.spendingAccount spend(10).transferTokens.fromAccount
      return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
    }).then(function(receipt) {
      return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, '!transfer.amount is > balance');
      //try transfer > approved.amount
      return tokenInstance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount});
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, '!transfer.amount > approved.amount');
      return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
    }).then(function(success) {
      assert.equal(success, true);
      return tokenInstance.transferFrom.call(fromAccount, toAccount, 69 {from: spendingAccount});
    }).then(function(receipt) {
      assert.equal(reciept.logs.length, 1, 'trigger.event[1]');
      assert.equal(receipt.logs[0].event)
    })
  });
});
