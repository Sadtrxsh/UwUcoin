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
      assert.equal(receipt.logs[0]._value, 1725000, 'receive.amount.recieved')
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), )
    })

  })
})
