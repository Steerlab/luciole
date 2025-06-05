import luciole.{describe, it}

pub fn it_test() {
  it("does nothing", fn() { Nil })
}

pub fn describe_test() {
  describe("project", [it("does nothing", fn() { Nil })])
}
