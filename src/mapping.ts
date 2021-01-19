import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  Execute,
  Vote,
} from "../generated/HumanityGovernance/HumanityGovernance";
import {  Proposal, GlobalVotes } from "../generated/schema";
let ZERO = BigInt.fromI32(0)
let ONE = BigInt.fromI32(1)

// export function handleexecute(event: execute): void {
//   // entities can be loaded from the store using a string id; this id
//   // needs to be unique across all entities of the same type
//   let entity = exampleentity.load(event.transaction.from.tohex());

//   // entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (entity == null) {
//     entity = new exampleentity(event.transaction.from.tohex());

//     // entity fields can be set using simple assignments
//     entity.count = zero
//   }

//   // bigint and bigdecimal math are supported
//   entity.count = entity.count.plus(one);

//   // entity fields can be set based on event parameters
//   entity.proposalid = event.params.proposalid;

//   // entities can be written to the store with `.save()`
//   entity.save();

//   // note: if a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. instead, create it fresh with
//   // `new entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // it is also possible to access smart contracts from mappings. for
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = contract.bind(event.address)
//   //
//   // the following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.proposals(...)
//   // - contract.yesvotes(...)
//   // - contract.time(...)
//   // - contract.open_vote_period(...)
//   // - contract.total_vote_period(...)
//   // - contract.getproposalscount(...)
//   // - contract.propose(...)
//   // - contract.void(...)
//   // - contract.withdrawtimes(...)
//   // - contract.proposalfee(...)
//   // - contract.getproposal(...)
//   // - contract.novotes(...)
//   // - contract.proposewithfeerecipient(...)
//   // - contract.veto_period(...)
//   // - contract.token(...)
//   // - contract.deposits(...)
// }

export function handleVote(event: Vote): void {
  let proposalId = event.params.proposalId.toHex();
  let proposal = Proposal.load(proposalId);
  if (proposal == null) {
    proposal = new Proposal(proposalId)
    proposal.save()
  } else {
    let globalVotes = getGlobalVotes()
    globalVotes.counter = globalVotes.counter.plus(ONE)
    globalVotes.save()
  }
}

function getGlobalVotes(): GlobalVotes {
  let globalId = '0x0'
  let globalVotes = GlobalVotes.load(globalId)

  if (globalVotes == null) {
    globalVotes = new GlobalVotes(globalId)
    globalVotes.counter = ZERO
  }

  return globalVotes as GlobalVotes
}
