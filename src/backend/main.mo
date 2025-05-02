//Hackathon-JagoanTante/src/backend/main.mo
import Types "types";
import Logic "logic";

actor {
  public shared ({ caller }) func createContract(
    name: Text,
    description: Text,
    participants: [Principal]
  ) : async Nat {
    await Logic.addContract(caller, name, description, participants);
  };

  public shared ({ caller }) func sign(id: Nat) : async () {
    await Logic.signContract(id, caller);
  };
}

