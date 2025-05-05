import ContractService "contract";
import Types "types";
import Char "mo:base/Char";
import Blob "mo:base/Blob";

actor Main {

  let getService = ContractService.ContractService;

  public shared ({ caller }) func createContract(
    name: Text,
    description: Text,
    participants: [Principal],
    chunk : Blob,
    createdAt: Int,
  ) : async Nat {
    let service = await getService();
    await service.createContract(caller, name, chunk, createdAt, description, participants);
  };

  public shared ({ caller }) func sign(id: Nat) : async () {
    let service = await getService();
    await service.signContract(id, caller);
  };

public shared func list() : async [Types.Contract] {
  let service = await getService();
  await service.getContracts();
};
}