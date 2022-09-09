import {
    TransferSingle,
  } from "../generated/HallOfFame/HallOfFame";
  import {  User } from "../generated/schema";
  
  
  export function handleTransferSingle(event: TransferSingle): void {
      // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = User.load(event.params.to.toHexString());
  
    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (!entity) {
      entity = new User(event.params.to.toHexString());
  
      // Entity fields can be set using simple assignments
      entity.tokenOwned = [event.params.id];
      entity.address = event.params.to;
    } else {
      entity.tokenOwned.push(event.params.id); 
    }
    // Entities can be written to the store with `.save()`
    entity.save();
  }
  
  