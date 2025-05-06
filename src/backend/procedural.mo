import Blob "mo:base/Blob";
import Map "mo:map/Map";
import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";

actor Main {

  // ====== TYPE ========
  public type FileChunk = {
    chunk: Blob;
    index: Nat;
  };

  public type Contract = {
    id: Nat;
    name: Text;
    description: Text;
    chunk: [FileChunk];
    createdAt: Int;
    creator: Principal;
    participants: [Principal];
    signed: [Principal];
    finalized: Bool;
  };

  // ===== MAP & HASH Utils =====
  stable var currentId : Nat = 0;

  let hashUtils : (Nat -> Hash.Hash, (Nat, Nat) -> Bool) = (
    func (x : Nat) : Hash.Hash = Nat32.fromNat(x),
    func (x : Nat, y : Nat) : Bool = x == y
  );

  stable var contractsMap = Map.new<Nat, Contract>();

  // ========== FUNCTION ==========

  public shared func createContract(
    caller: Principal,
    name : Text,
    description : Text,
    participants : [Principal],
    chunk : Blob,
    createdAt : Int,
  ) : async Nat {
    let id = currentId;
    currentId += 1;

    let newContract : Contract = {
      id = id;
      name = name;
      description = description;
      chunk = [{ chunk = chunk; index = 0 }];
      createdAt = createdAt;
      creator = caller;
      participants = participants;
      signed = [];
      finalized = false;
    };

    ignore Map.put(contractsMap, hashUtils, id, newContract);
    id
  };

  public shared func signContract(id: Nat, caller: Principal) : async () {
    switch (Map.get(contractsMap, hashUtils, id)) {
      case null {
        Debug.trap("Kontrak tidak ditemukan.");
      };
      case (?contract) {
        if (contract.finalized) {
          Debug.trap("Kontrak sudah final.");
        };

        let isParticipant : Bool = Array.find<Principal>(
          contract.participants,
          func(p : Principal) : Bool { Principal.equal(p, caller) }
        ) != null;

        if (not isParticipant) Debug.trap("Anda bukan peserta kontrak.");

        let alreadySigned : Bool = Array.find<Principal>(
          contract.signed,
          func(p : Principal) : Bool { Principal.equal(p, caller) }
        ) != null;

        if (alreadySigned) return;

        let newSigned : [Principal] = Array.append(contract.signed, [caller]);
        let isFinalNow : Bool = Array.size(newSigned) == Array.size(contract.participants);

        let updated : Contract = {
          contract with
          signed = newSigned;
          finalized = isFinalNow;
        };

        ignore Map.put(contractsMap, hashUtils, id, updated);
      }
    }
  };

  public query func getContracts() : async [Contract] {
    Iter.toArray(Map.vals(contractsMap));
  };

  public query func getFile(id: Nat) : async Blob {
    switch (Map.get(contractsMap, hashUtils, id)) {
      case null { Debug.trap("Kontrak tidak ditemukan."); };
      case (?contract) {
        if (Array.size(contract.chunk) == 0) { Debug.trap("File kosong."); };
        contract.chunk[0].chunk;
      }
    }
  };
}
