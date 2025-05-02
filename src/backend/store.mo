import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Hash "mo:base/Hash";

import Types "types";

module {
  public object Store {
    public let contractsMap = HashMap.HashMap<Nat, Types.Contract>(10, Nat.equal, Hash.hash);
    public var currentId : Nat = 0;
  };
}
