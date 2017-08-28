(module
  (type $t0 (func (param i32 i32) (result i32)))
  (func $add (type $t0) (param $p0 i32) (param $p1 i32) (result i32)
    (block $B0
      (return
        (i32.add
          (get_local $p0)
          (get_local $p1)))
      (unreachable))
    (unreachable))
  (memory $M0 1)
  (export "add" (func $add))
  (export "memory" (memory 0)))
