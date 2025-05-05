import Char "mo:base/Char";
module {
  public type FileChunk = {
    chunk: Blob;
    index: Nat;
  };

  public type Contract = {
    id: Nat;
    name: Text;
    description: Text;
<<<<<<< HEAD
    fileCid: Char;
=======
    chunks: [FileChunk];
>>>>>>> 3f6020f (feat: enhance contract management with FileChunk type and improve contract card interaction)
    createdAt: Int;
    creator: Principal;
    participants: [Principal];
    signed: [Principal];
    finalized: Bool;
  };
};