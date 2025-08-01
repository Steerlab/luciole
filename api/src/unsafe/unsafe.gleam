//// Every unsafe functions lives in that namespace. Unsafe functions are
//// defined as functions that break the type-system, or that use dangerous
//// side-effects that can lead to the application breaking.
////
//// You should not use any function in that module, unless you have really
//// good reasons, like patching some missing features in packages, or when
//// writing some libraries. Unsafe functions should act as helpers to write
//// the missing pieces to use with correct type-checking. An example of this
//// is coercing the types in `pog.Value`, where all `coerce` does is simply
//// returning the same value to let `pgo` handle it.

/// Transtype data. That function should _never_ be used under normal
/// circumstances. Use that function in your library or framework, not in your
/// daily code in the codebase. Any code using `unsafe.coerce` when it can be
/// avoided _will be rejected_ without further research if the code is correct.
@external(erlang, "unsafe_ffi", "coerce")
@external(javascript, "./unsafe.ffi.mjs", "coerce")
pub fn coerce(a: a) -> b

/// Provides a unique ID everytime it's called. On JavaScript, they're generated
/// as monotonic ID, starting with 0. On Erlang, they're generated with
/// `erlang:unique_integer`. Risk of collision with an existing ID on JS is
/// higher than Erlang if you're comparing them with other integers.
@external(erlang, "erlang", "unique_integer")
@external(javascript, "./unsafe.ffi.mjs", "uniqueId")
pub fn unique_id() -> Int
