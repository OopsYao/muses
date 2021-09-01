# Closure Inside Loop

The closure inside loop behaves differently in Python and JavaScript,
and technically, Python behaves as defined.^[<https://stackoverflow.com/a/233835>]

```python
# closure.py
func_list = []
for i in range(3):
    def myfunc():
        return i
    func_list.append(myfunc)

for f in func_list:
    print(f())
# 2, 2, 2
```

```javascript
// closure.js
const funcList = []
for (const i of Array(3).keys()) {
  function myfunc() {
    return i
  }
  funcList.push(myfunc)
}

for (const f of funcList) {
  console.log(f())
}
// 0, 1, 2
```

By definition, the three inner functions have **the closure
of the environment they're defined in**, hence they all
own the same variable `i` (not the value).
And if we make environments vary, then
the functions we obtain will behave differently.

```diff
--- a/closure.py
+++ b/closure_m.py
@@ -1,8 +1,10 @@
 func_list = []
 for i in range(3):
-    def myfunc():
-        return i
-    func_list.append(myfunc)
+    def get_func(j):
+        def fun():
+            return j
+        return fun
+    func_list.append(get_func(i))

 for f in func_list:
     print(f())
```
