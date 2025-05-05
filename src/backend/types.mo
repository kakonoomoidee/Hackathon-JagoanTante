module {
  public type FileChunk = {
    chunk: Blob;
    index: Nat;
  };

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
};