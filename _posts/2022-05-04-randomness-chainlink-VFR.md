---
layout: post
title: "Random with Chainlink - Overview"
description: "How to generate random numbers with Chainlink VFR"
thumb_image: "2022-05-04/alperen-yazgi-dices.jpg"
tags: [ blockchain, smart-contracts ]
---


Since the EVM is deterministic, it's not actually possible to generate a totally random number.
Just to name a problem: different nodes would generate different numbers, so data inconsistency arise between nodes.

## Chainlink VRF

**VRF** stands for **V**erifiable **R**andom **F**unction.

Chainlink provides an on-chain system that allows other smart contracts to receive random numbers that have on-chain proof of true randomness <a href="https://docs.chain.link/docs/intermediates-tutorial/" target="_blank">Read more</a>


The process of using random Chainlink VRF seems quite confusing at first, but it's actually quite straightforward.


## Architecture overview ##

### Coordinator contract

A **Coordinator** contract 
* generate **subscriptions** for other contracts that need random numbers 
* provides the random numbers to them

A **subscription** is just a numeric identifier between a Coordinator and an owner that provides funds in LINK.

On the subscription you can **register**/**unregister** consumers addresses: only registered consumers may interact with the subscription.

When a consumer requests random numbers it must provide its subscription too.
This allows to check who is allowed to use the subscription funds.

### Asynchronous random numbers

Producing the numbers is an asynchronous process: it requires a certain amount of blocks before the numbers are returned.
When this happens the coordinator contract will call a consumer contract method to provide the values to the contract.
The logic of what to do with these numbers is in the consumer contract.

The coordinator is handled by Chainlink so we basically don't need to know much more for the moment.

### Consumer Contract

When we want to use some randomness, we are a **Consumer**.

A **Consumer** contract is a contract that 
* has the address of a specific coordinator to interact with
* has the parameters that configure how to interact with the coordinator
* overrides and implements the **fulfillRandomWords**  method  of the **VRFConsumerBaseV2** contract

When deploying our consumer contract we must know the following concepts:
* We need to have interact with a specific coordinator, defined by the address we decide.
* We, as the consumer contract, need an active subscription with the coordinator in order to receive numbers
(this can be done via smart contracts methods or, if you need just one subscription, manually from the web interface chainlink provides)
* The coordinator needs LINKs tokens funding for the specific subscription in order to pay for the work
(again, this can be done programmatically via smart contract or manually from the web UI)
* we need to build the logic of what to do with the numbers when we receive them.


The numbers are something like 

*uint256: 74038576587151295566926440062894895049890862927323911969343895969009296037353*

*uint256: 39734012598035685242862857745019683943452512009239385040200101796659307914370*

So for example should we neeed just a number between 1-20 we could use the chainlink example and do something like:

{% highlight javascript %}
function fulfillRandomWords(uint256 requestId , uint256[] memory randomWords) internal override 
{

    // transform the result to a number between 1 and 20 inclusively
    uint256 d20Value = (randomWords[0] % 20) + 1;

    // ... other things ...
}
{% endhighlight %}

### Just one parameter more 
I hinted before that the Consumer contract needs some parameters to interact with the Coordinator.
Should you choose to study just one, it's the **Gas Lane Hash Key**

In Layman's terms:
> A parameter that allows you to decide the maximum gas price you are willing to pay for a request in wei

Each blockchain coordinator has different lanes. You can find their hash in the [VFR Contract Page](https://docs.chain.link/docs/vrf-contracts/)




## TL;DR ##
* create a subscription with a **Coordinator** and save the ID
* Fund the subscription with LINK
* From the **Consumer** interact with the **Coordinator** by providing the subscription ID
* Handle the logic to execute when the numbers are received in the Consumer **fullfillRandomWords** function


## References
[Chainlink documentation](https://docs.chain.link/docs/intermediates-tutorial/)

[Chainlink WebUI to manage Subscriptions](https://vrf.chain.link/) (check the docs for differnt networks)

[Chainlink smart contracts repo](https://github.com/smartcontractkit/chainlink/)