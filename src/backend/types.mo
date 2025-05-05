import Char "mo:base/Char";
module {
  public type Contract = {
    id: Nat;
    name: Text;
    description: Text;
    fileCid: Char;
    createdAt: Int;
    creator: Principal;
    participants: [Principal];
    signed: [Principal];
    finalized: Bool;
  };
}
