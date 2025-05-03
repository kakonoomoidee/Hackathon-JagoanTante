//Hackathon-JagoanTante/src/backend/types.mo
module {
  public type Contract = {
    id: Nat;
    name: Text;
    description: Text;
    creator: Principal;
    participants: [Principal];
    signed: [Principal];
    finalized: Bool;
  };
}