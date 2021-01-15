import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  Execute,
  Vote,
} from "../generated/HumanityGovernance/HumanityGovernance";
import { ExampleEntity, Proposal, GlobalVotes } from "../generated/schema";
let ZERO = BigInt.fromI32(0)
let ONE = BigInt.fromI32(1)

export function handleExecute(event: Execute): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = ZERO
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count.plus(ONE);

  // Entity fields can be set based on event parameters
  entity.proposalId = event.params.proposalId;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.proposals(...)
  // - contract.yesVotes(...)
  // - contract.time(...)
  // - contract.OPEN_VOTE_PERIOD(...)
  // - contract.TOTAL_VOTE_PERIOD(...)
  // - contract.getProposalsCount(...)
  // - contract.propose(...)
  // - contract.void(...)
  // - contract.withdrawTimes(...)
  // - contract.proposalFee(...)
  // - contract.getProposal(...)
  // - contract.noVotes(...)
  // - contract.proposeWithFeeRecipient(...)
  // - contract.VETO_PERIOD(...)
  // - contract.token(...)
  // - contract.deposits(...)
}

export function handleVote(event: Vote): void {
  let proposalId = event.params.proposalId.toHex();
  let proposal = Proposal.load(proposalId);
  if (proposal == null) {
    log.critical("handleVote: Proposal with id {} not found", [proposalId]);
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