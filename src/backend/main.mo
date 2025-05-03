import ContractService "contract";
import Types "types";

actor Main {

  let getService = ContractService.ContractService;

  public shared ({ caller }) func createContract(
    name: Text,
    description: Text,
    participants: [Principal]
  ) : async Nat {
    let service = await getService();
    await service.createContract(caller, name, description, participants);
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