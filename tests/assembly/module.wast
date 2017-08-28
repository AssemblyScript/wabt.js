(module
 (type $iii (func (param i32 i32) (result i32)))
 (memory $0 1)
 (export "add" (func $add))
 (export "memory" (memory $0))
 (func $add (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (return
   (i32.add
    (get_local $0)
    (get_local $1)
   )
  )
 )
)
