module {
  public type Contract = {
    id: Nat;
    name: Text;
    description: Text;
    fileCid: Text;
    createdAt: Int;
    creator: Principal;
    participants: [Principal];
    signed: [Principal];
    finalized: Bool;
  };
}
