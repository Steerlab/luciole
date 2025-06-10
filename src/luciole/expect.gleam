pub fn to_be_true(_value: Bool) {
  Nil
}

pub fn method_to_chai(label: String) -> String {
  case label {
    "to_be_true" -> "to.be.true"
    _ -> panic as "Error: unimplemented expect method"
  }
}
