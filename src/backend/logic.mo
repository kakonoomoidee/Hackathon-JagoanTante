//Hackathon-JagoanTante/src/backend/logic.mo
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

import Types "types";
import Store "store";

module {
  public func addContract(
    caller: Principal,
    name: Text,
    description: Text,
    participants: [Principal]
  ) : async Nat {
    let id = Store.currentId;
    Store.currentId += 1;

    let newContract : Types.Contract = {
      id = id;
      name = name;
      description = description;
      creator = caller;
      participants = participants;
      signed = [];
      finalized = false;
    };

    Store.contractsMap.put(id, newContract);
    return id;
  };

  public func signContract(id: Nat, caller: Principal) : async () {
    switch (Store.contractsMap.get(id)) {
      case (null) { Debug.trap("Kontrak tidak ditemukan.") };
      case (?contract) {
        if (contract.finalized) Debug.trap("Kontrak sudah final.");

        let isParticipant = Array.find<Principal>(
          contract.participants,
          func(p) { Principal.equal(p, caller) }
        ) != null;

        if (not isParticipant) Debug.trap("Anda bukan peserta kontrak.");

        let alreadySigned = Array.find<Principal>(
          contract.signed,
          func(p) { Principal.equal(p, caller) }
        ) != null;

        if (not alreadySigned) {
          let newSigned = Array.append<Principal>(contract.signed, [caller]);
          let isFinalNow = Array.size(newSigned) == Array.size(contract.participants);

          let updated = {
            contract with
            signed = newSigned;
            finalized = isFinalNow;
          };

          Store.contractsMap.put(id, updated);
        };
      }
    }
  };

  public func getContracts() : async [Types.Contract] {
    Iter.toArray(Store.contractsMap.vals());
  };
}
