//Hackathon-JagoanTante/src/backend/main.mo
import ContractService "contract";

actor Main {
  let service = ContractService.ContractService();

  public shared ({ caller }) func createContract(
    name: Text,
    description: Text,
    participants: [Principal]
  ) : async Nat {
    await service.createContract(caller, name, description, participants);
  };

  public shared ({ caller }) func sign(id: Nat) : async () {
    await service.signContract(id, caller);
  };

  public query func list() : async [ContractService.Types.Contract] {
    await service.getContracts();
  };
}
