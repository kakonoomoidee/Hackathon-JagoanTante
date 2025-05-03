//hackathon/Hackathon-JagoanTante/src/backend/contract.mo
import Map "mo:map/Map";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Types "types";

shared({}) actor class ContractService() = this {

  stable var currentId : Nat = 0;
  let natHash = func(n : Nat) : Hash.Hash { Nat.hash(n) };
  let natEqual = func(a : Nat, b : Nat) : Bool { a == b };
  stable var contractsMap = Map.new<Nat, Types.Contract>();

  public shared func createContract(
    caller: Principal,
    name: Text,
    description: Text,
    participants: [Principal]
  ) : async Nat {
    let id = currentId;
    currentId += 1;

    let newContract : Types.Contract = {
      id = id;
      name = name;
      description = description;
      creator = caller;
      participants = participants;
      signed = [];
      finalized = false;
    };

    ignore Map.put(contractsMap, natHash, natEqual, id, newContract);
    id
  };

  public shared func signContract(id: Nat, caller: Principal) : async () {
    switch (Map.get(contractsMap, natHash, natEqual, id)) {
      case null {
        Debug.trap("Kontrak tidak ditemukan.");
      };
      case (?contract) {
        if (contract.finalized) {
          Debug.trap("Kontrak sudah final.");
        };

        let isParticipant = Array.find(contract.participants, func(p) { Principal.equal(p, caller) }) != null;
        if (not isParticipant) Debug.trap("Anda bukan peserta kontrak.");

        let alreadySigned = Array.find(contract.signed, func(p) { Principal.equal(p, caller) }) != null;
        if (alreadySigned) return;

        let newSigned = Array.append(contract.signed, [caller]);
        let isFinalNow = Array.size(newSigned) == Array.size(contract.participants);

        let updated = {
          contract with
          signed = newSigned;
          finalized = isFinalNow;
        };

        ignore Map.put(contractsMap, natHash, natEqual, id, updated);
      }
    }
  };

  public query func getContracts() : async [Types.Contract] {
    Iter.toArray(Map.vals(contractsMap));
  };
}