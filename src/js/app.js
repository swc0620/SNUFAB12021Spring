App = {
  web3Provider: null,
  contracts: {},
  init: async function() {
    $.getJSON('../users.json', function(data) {
      var userRow = $('#userRow');
      var userTemplate = $('#userTemplate');

      /* Token 0 */
      userTemplate.find('#token-name-0').text(data[0].token_name);
      userTemplate.find('#panel-title-0').text(data[0].name);
      // userTemplate.find('#user-age-0').text(data[0].age);
      // userTemplate.find('#user-location-0').text(data[0].location);
      userTemplate.find('#token-img-0').attr('src', data[0].picture);
      userTemplate.find('#btn-view-age-0').text("View age: 2 "+data[0].token_name+"s");
      userTemplate.find('#btn-view-location-0').text("View location: 3 "+data[0].token_name+"s");
      userTemplate.find('#btn-shall-we-chat-0').text("Shall we chat?: 5 "+data[0].token_name+"s");
      userTemplate.find('#btn-open-chat-0').text("Open chat: 10 "+data[0].token_name+"s");
      // userTemplate.find('#btn-swap-token').attr('id', 'btn-swap-token-'+JSON.stringify(i));
      userTemplate.find('#btn-swap-token-0').text("swap "+data[0].token_name);

      /* Token 1 */
      userTemplate.find('#token-name-1').text(data[1].token_name);
      userTemplate.find('#panel-title-1').text(data[1].name);
      // userTemplate.find('#user-age-1').text(data[1].age);
      // userTemplate.find('#user-location-1').text(data[1].location);
      userTemplate.find('#token-img-1').attr('src', data[1].picture);
      userTemplate.find('#btn-view-age-1').text("View age: 2 "+data[1].token_name+"s");
      userTemplate.find('#btn-view-location-1').text("View location: 3 "+data[1].token_name+"s");
      userTemplate.find('#btn-shall-we-chat-1').text("Shall we chat?: 5 "+data[1].token_name+"s");
      userTemplate.find('#btn-open-chat-1').text("Open chat: 10 "+data[1].token_name+"s");
      // userTemplate.find('#btn-swap-token').attr('id', 'btn-swap-token-'+JSON.stringify(i));
      userTemplate.find('#btn-swap-token-1').text("swap "+data[1].token_name);

      /* Token 2 */
      userTemplate.find('#token-name-2').text(data[2].token_name);
      userTemplate.find('#panel-title-2').text(data[2].name);
      // userTemplate.find('#user-age-2').text(data[2].age);
      // userTemplate.find('#user-location-2').text(data[2].location);
      userTemplate.find('#token-img-2').attr('src', data[2].picture);
      userTemplate.find('#btn-view-age-2').text("View age: 2 "+data[2].token_name+"s");
      userTemplate.find('#btn-view-location-2').text("View location: 3 "+data[2].token_name+"s");
      userTemplate.find('#btn-shall-we-chat-2').text("Shall we chat?: 5 "+data[2].token_name+"s");
      userTemplate.find('#btn-open-chat-2').text("Open chat: 10 "+data[2].token_name+"s");
      // userTemplate.find('#btn-swap-token').attr('id', 'btn-swap-token-'+JSON.stringify(i));
      userTemplate.find('#btn-swap-token-2').text("swap "+data[2].token_name);

      userRow.append(userTemplate.html());


      $("#ddate_img").attr('src', "../images/DDATE.png");
    });
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.send('eth_requestAccounts')();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    else {
      // If no injected web3 instance is present, we create our web3 object based on our local provider.
      //(This fallback is fine for development environments, but insecure and not suitable for production.)
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('DDATE.json', function(data) {
      // Get the necessart contract artifcat file and instantiate it with @truffle/contract
      var DDATEArtifact = data;
      App.contracts.DDATE = TruffleContract(DDATEArtifact);

      // Set the provider for our contracts
      App.contracts.DDATE.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.showBalance(0);
    }).then(function () {
    });
    $.getJSON('DDATE_0.json', function(data) {
      // Get the necessart contract artifcat file and instantiate it with @truffle/contract
      var DDATEArtifact = data;
      App.contracts.DDATE_0 = TruffleContract(DDATEArtifact);

      // Set the provider for our contracts
      App.contracts.DDATE_0.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.showBalance(1);
    }).then(function () {
    });
    $.getJSON('DDATE_1.json', function(data) {
      // Get the necessart contract artifcat file and instantiate it with @truffle/contract
      var DDATEArtifact = data;
      App.contracts.DDATE_1 = TruffleContract(DDATEArtifact);

      // Set the provider for our contracts
      App.contracts.DDATE_1.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.showBalance(2);
    }).then(function () {
    });
  },


  showBalance: function(i) {
    var ddateInstance;
    if (i == 0) {
      App.contracts.DDATE.deployed().then(function(instance) {
        ddateInstance = instance;
        return ddateInstance.totalSupply.call();
      }).then(function(total_supply) {
        $('.panel-user').eq(0).find('#token-supply-0').text(total_supply);
      }).catch(function(err) {
        console.log(err.message);
      });
    }
    if (i == 1) {
      App.contracts.DDATE_0.deployed().then(function(instance) {
        ddateInstance = instance;
        return ddateInstance.totalSupply.call();
      }).then(function(total_supply) {
        $('.panel-user').eq(1).find('#token-supply-1').text(total_supply);
      }).catch(function(err) {
        console.log(err.message);
      });
    }
    if (i == 2) {
      App.contracts.DDATE_1.deployed().then(function(instance) {
        ddateInstance = instance;
        return ddateInstance.totalSupply.call();
      }).then(function(total_supply) {
        $('.panel-user').eq(2).find('#token-supply-2').text(total_supply);
      }).catch(function(err) {
        console.log(err.message);
      });
    }
  },

  showMyBalance: function(account) {
    var ddateInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.DDATE.deployed().then(function(instance) {
        ddateInstance = instance;
        return ddateInstance.balanceOf(account);
      }).then(function(balance) {
        $('.panel-user').eq(0).find('#my-balance-0').text(balance);
        console.log('my balance has been displayed')
      }).catch(function(err) {
        console.log(err.message);
      });

      App.contracts.DDATE_0.deployed().then(function(instance) {
        ddateInstance = instance;
        return ddateInstance.balanceOf(account);
      }).then(function(balance) {
        $('.panel-user').eq(1).find('#my-balance-1').text(balance);
        console.log('my balance has been displayed')
      }).catch(function(err) {
        console.log(err.message);
      });

      App.contracts.DDATE_1.deployed().then(function(instance) {
        ddateInstance = instance;
        return ddateInstance.balanceOf(account);
      }).then(function(balance) {
        $('.panel-user').eq(2).find('#my-balance-2').text(balance);
        console.log('my balance has been displayed')
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  buyAToken: function(i, account) {
    const accountTwo = account;
    var ddateInstance;
    if (i == 0) {
        App.contracts.DDATE.deployed().then(async (instance) => {
        ddateInstance = instance;
        await ddateInstance.buyToken(1, {from: accountTwo,
                value: web3.toWei("1", "ether"),
                gas: "4712388"
        });

        App.showMyBalance(account)
      })
    }
    if (i == 1) {
      App.contracts.DDATE_0.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buyToken(1, {from: accountTwo,
              value: web3.toWei("1", "ether"),
              gas: "4712388"
      });

      App.showMyBalance(account)
      })
    }
    if (i == 2) {
      App.contracts.DDATE_1.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buyToken(1, {from: accountTwo,
              value: web3.toWei("1", "ether"),
              gas: "4712388"
      });

      App.showMyBalance(account)
      })
    }
  },

  buySeeAge: function(i, account) {
    const accountTwo = account;
    var ddateInstance;
    if (i == 0) {
        App.contracts.DDATE.deployed().then(async (instance) => {
        ddateInstance = instance;
        await ddateInstance.buySeeAge({from: accountTwo
        });

        App.handleViewAge(account)
      })
    }
    if (i == 1) {
      App.contracts.DDATE_0.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buySeeAge({from: accountTwo,
      });

      App.handleViewAge(account)
      })
    }
    if (i == 2) {
      App.contracts.DDATE_1.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buySeeAge({from: accountTwo,
      });

      App.handleViewAge(account)
      })
    }
  },

  buySeeLocation: function(i, account) {
    const accountTwo = account;
    var ddateInstance;
    if (i == 0) {
        App.contracts.DDATE.deployed().then(async (instance) => {
        ddateInstance = instance;
        await ddateInstance.buySeeLocation({from: accountTwo
        });

        App.handleViewLocation(account)
      })
    }
    if (i == 1) {
      App.contracts.DDATE_0.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buySeeLocation({from: accountTwo,
      });

      App.handleViewLocation(account)
      })
    }
    if (i == 2) {
      App.contracts.DDATE_1.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buySeeLocation({from: accountTwo,
      });

      App.handleViewLocation(account)
      })
    }
  },

  buyShallWeChat: function(i, account) {
    const accountTwo = account;
    var ddateInstance;
    if (i == 0) {
        App.contracts.DDATE.deployed().then(async (instance) => {
        ddateInstance = instance;
        await ddateInstance.buyShallWeChat({from: accountTwo
        });

        App.handleShallWeChat(account)
      })
    }
    if (i == 1) {
      App.contracts.DDATE_0.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buyShallWeChat({from: accountTwo,
      });

      App.handleShallWeChat(account)
      })
    }
    if (i == 2) {
      App.contracts.DDATE_1.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buyShallWeChat({from: accountTwo,
      });

      App.handleShallWeChat(account)
      })
    }
  },

  buyOpenChat: function(i, account) {
    const accountTwo = account;
    var ddateInstance;
    if (i == 0) {
        App.contracts.DDATE.deployed().then(async (instance) => {
        ddateInstance = instance;
        await ddateInstance.buyOpenChat({from: accountTwo
        });

        App.handleOpenChat(account)
      })
    }
    if (i == 1) {
      App.contracts.DDATE_0.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buyOpenChat({from: accountTwo,
      });

      App.handleOpenChat(account)
      })
    }
    if (i == 2) {
      App.contracts.DDATE_1.deployed().then(async (instance) => {
      ddateInstance = instance;
      await ddateInstance.buyOpenChat({from: accountTwo,
      });

      App.handleOpenChat(account)
      })
    }
  },


  handleOpenChat: function(account) {
    var ddateInstance;
    App.contracts.DDATE.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canOpenChat(account);
    }).then(function(canOpenChat) {
      if (canOpenChat == true) {
        $('.panel-user').eq(0).find('#btn-open-chat-0').text('You can now talk with CAR');
      } else {
        $('.panel-user').eq(0).find('#btn-open-chat-0').text('Open chat: 10 CARs');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_0.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canOpenChat(account);
    }).then(function(canOpenChat) {
      if (canOpenChat == true) {
        $('.panel-user').eq(1).find('#btn-open-chat-1').text('You can now talk with GEO');
      } else {
        $('.panel-user').eq(1).find('#btn-open-chat-1').text('Open chat: 10 GEOs');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_1.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canOpenChat(account);
    }).then(function(canOpenChat) {
      if (canOpenChat == true) {
        $('.panel-user').eq(2).find('#btn-open-chat-2').text('You can now talk with SAM');
      } else {
        $('.panel-user').eq(2).find('#btn-open-chat-2').text('Open chat: 10 SAMs');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });
    App.showMyBalance(account)

  },


  handleShallWeChat: function(account) {
    var ddateInstance;
    App.contracts.DDATE.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canShallWeChat(account);
    }).then(function(canShallWeChat) {
      if (canShallWeChat == true) {
        $('.panel-user').eq(0).find('#btn-shall-we-chat-0').text('You asked CAR to talk');
      } else {
        $('.panel-user').eq(0).find('#btn-shall-we-chat-0').text('Shall we chat?: 5 CARs');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_0.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canShallWeChat(account);
    }).then(function(canShallWeChat) {
      if (canShallWeChat == true) {
        $('.panel-user').eq(1).find('#btn-shall-we-chat-1').text('You asked GEO to talk');
      } else {
        $('.panel-user').eq(1).find('#btn-shall-we-chat-1').text('Shall we chat?: 5 GEOs');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_1.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canShallWeChat(account);
    }).then(function(canShallWeChat) {
      if (canShallWeChat == true) {
        $('.panel-user').eq(2).find('#btn-shall-we-chat-2').text('You asked SAM to talk');
      } else {
        $('.panel-user').eq(2).find('#btn-shall-we-chat-2').text('Shall we chat?: 5 SAMs');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });
    App.showMyBalance(account)

  },


  handleViewLocation: function(account) {
    var ddateInstance;
    App.contracts.DDATE.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canSeeLocation(account);
    }).then(function(canSeeLocation) {
      if (canSeeLocation == true) {
        $('.panel-user').eq(0).find('#user-location-0').text('Busan');
      } else {
        $('.panel-user').eq(0).find('#user-location-0').text('');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_0.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canSeeLocation(account);
    }).then(function(canSeeLocation) {
      if (canSeeLocation == true) {
        $('.panel-user').eq(1).find('#user-location-1').text('Seoul');
      } else {
        $('.panel-user').eq(1).find('#user-location-1').text('');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_1.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canSeeLocation(account);
    }).then(function(canSeeLocation) {
      if (canSeeLocation == true) {
        $('.panel-user').eq(2).find('#user-location-2').text('Daejeon');
      } else {
        $('.panel-user').eq(2).find('#user-location-2').text('');

      }
      console.log('his location is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });
    App.showMyBalance(account)

  },


  handleViewAge: function(account) {
    var ddateInstance;
    App.contracts.DDATE.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canSeeAge(account);
    }).then(function(canSeeAge) {
      if (canSeeAge == true) {
        $('.panel-user').eq(0).find('#user-age-0').text(26);
      } else {
        $('.panel-user').eq(0).find('#user-age-0').text('');

      }
      console.log('his age is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_0.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canSeeAge(account);
    }).then(function(canSeeAge) {
      if (canSeeAge == true) {
        $('.panel-user').eq(1).find('#user-age-1').text(24);
      } else {
        $('.panel-user').eq(1).find('#user-age-1').text('');

      }
      console.log('his age is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });

    App.contracts.DDATE_1.deployed().then(function(instance) {
      ddateInstance = instance;
      return ddateInstance.canSeeAge(account);
    }).then(function(canSeeAge) {
      if (canSeeAge == true) {
        $('.panel-user').eq(2).find('#user-age-2').text(22);
      } else {
        $('.panel-user').eq(2).find('#user-age-2').text('');

      }
      console.log('his age is desplayed')
    }).catch(function(err) {
      console.log(err.message);
    });
    App.showMyBalance(account);

  },
};

$(function() {
  $(window).on('load', function() {
    App.init();
    if (window.ethereum) {
      // use MetaMask's provider
      App.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // get permission to access accounts

      // detect Metamask account change
      window.ethereum.on('accountsChanged', function (accounts) {
        console.log('accounts changed',accounts);
        App.showMyBalance(accounts[0]);
        App.handleViewAge(accounts[0]);
        App.handleViewLocation(accounts[0]);
        App.handleShallWeChat(accounts[0]);
        App.handleOpenChat(accounts[0]);
      });

       // detect Network account change
      window.ethereum.on('networkChanged', function(networkId){
        console.log('networkChanged',networkId);
      });
    } else {
      console.warn(
        "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      App.web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
      );
    }
  });
});

$("#enableEthereumButton").on('click', async () => {
  var account = await getAccount();
  App.showMyBalance(account);
});

$(document).on('click', "#btn-swap-token-0", async () => {
  console.log('swap CAR');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyAToken(0, account);
});

$(document).on('click', "#btn-swap-token-1", async () => {
  console.log('swap GEO');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyAToken(1, account);
});

$(document).on('click', "#btn-swap-token-2", async () => {
  console.log('swap SAM');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyAToken(2, account);
});

$(document).on('click', "#btn-view-age-0", async () => {
  console.log('view CAR age');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buySeeAge(0, account);
});

$(document).on('click', "#btn-view-age-1", async () => {
  console.log('view GEO age');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buySeeAge(1, account);
});

$(document).on('click', "#btn-view-age-2", async () => {
  console.log('view SAM age');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buySeeAge(2, account);
});

$(document).on('click', "#btn-view-location-0", async () => {
  console.log('view CAR location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buySeeLocation(0, account);
});

$(document).on('click', "#btn-view-location-1", async () => {
  console.log('view GEO location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buySeeLocation(1, account);
});

$(document).on('click', "#btn-view-location-2", async () => {
  console.log('view SAM location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buySeeLocation(2, account);
});


$(document).on('click', "#btn-shall-we-chat-0", async () => {
  console.log('view CAR location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyShallWeChat(0, account);
});

$(document).on('click', "#btn-shall-we-chat-1", async () => {
  console.log('view GEO location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyShallWeChat(1, account);
});

$(document).on('click', "#btn-shall-we-chat-2", async () => {
  console.log('view SAM location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyShallWeChat(2, account);
});


$(document).on('click', "#btn-open-chat-0", async () => {
  console.log('view CAR location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyOpenChat(0, account);
});

$(document).on('click', "#btn-open-chat-1", async () => {
  console.log('view GEO location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyOpenChat(1, account);
});

$(document).on('click', "#btn-open-chat-2", async () => {
  console.log('view SAM location');
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  App.buyOpenChat(2, account);
});
async function getAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  $("#showAccount").html(account);
  console.log('account displayed on page');
  return account
}
