# Coroutine

At first glance, the implement of *coroutine* is just a function that could return several times.
Actually it gives the ability to switch out a process and switch back in later (with outside information)
as it preserves the variable environment, hence
we can split the running of a process into several parts and combine
they with other processes at programming level.

## Coroutine as Async Runnner

The *Promise* in JavaScript solves the callback hell problem,
but the callback pattern is still noisy and not straightforward as sync
code. The *async/await* syntactic sugar is much preferable, and here we
can use the coroutine to mimic it.^[[Async/await vs Coroutines vs Promises vs Callbacks](https://blog.benestudio.co/async-await-vs-coroutines-vs-promises-eaedee4e0829#75a4)]

The basic idea is that we put our async code in a coroutine,
after meeting the non-blocking codes (async functions), we switch out this
coroutine, and set a callback to bring the resolved value back after it resolved.
An implement by (tail) recursion is followed. (Actually, the recursion only happens
at non-promise yield, hence if we do not deal the non-promise value, there
will be no recursion at all)

```js
// Adapted from https://blog.benestudio.co/async-await-vs-coroutines-vs-promises-eaedee4e0829
const delay = (ms, v) => new Promise(resolve => {
    setTimeout(() => resolve(v), ms)
})

// Async codes to execute
function* todos() {
    const a = yield delay(1000, "Hello, I'm an")
    console.log(a)

    const b = yield delay(1000, "async coroutine!")
    console.log(b)
}

// Async runner
const myAsync = (iterator, yieldValue) => {
    const { done, value } = iterator.next(yieldValue)
    if (done) {
        return
    } else if (value.constructor === Promise) {
        // Bring the value back after it resovled
        value.then(v => myAsync(iterator, v))
    } else {
        myAsync(iterator, value)
    }
}
myAsync(todos())
```
