# Data Structures - Typed Javascript Demo

Demo of a typed JavaScript project using Flow.

## Why

While JavaScript has a counterintuitive typesystem ([obligatory meme](https://twitter.com/cdesio/status/1013166206877163520)), it does not mean
it is impossible to typecheck programs written in it. It is true that humans find type coercion and comparison rules
difficult and irrational, that is because they tend to reason in terms of arithmetic systems they are familiar with, e.g. integers or real numbers.

Extending the JavaScript typesystem with rules that make it not just easier to work with but also _sound_ is the goal of projects
like [Flow](https://flow.org/en). The Flow typesystem is described on [ArXiv](https://arxiv.org/pdf/1708.08021.pdf). [TypeScript](https://www.typescriptlang.org/)
is another example, albeit with a formally weaker typesystem, but equally great for development.

One focus of this repository is on typing data structures and algorithms implemented using plain JavaScript techniques, with Flow annotations.

It also focuses on testing. Typecheckers can decide if the implementation is safe—as in, every evaluation step is operating only on values of the expected type (type soundness)—but not
whether the implementation is actually conforming to the algorithm specification (unless the typechecker also happens to be a [theorem](https://coq.inria.fr/) [prover](http://wiki.portal.chalmers.se/agda/pmwiki.php), so that type definitions and algorithm specification are the same). Testing is necessary to have a certain degree of confidence (but no guarantee) in the soundness of the implementation.

## Structure

Every module has three parts:

- JavaScript implementation (*.js): Direct implementations of some generic data structures in plain JavaScript (ES8) with Flow annotations.

- Runtime tests (*.spec.js): Unit tests. These are typechecked first, then types are stripped using the flow-strip-types Babel transform before running Jest.

- Compile-time tests (*.flowcheck.js): Compile-time checks for Flow types. Never executed in runtime, only automatically checked by Flow. It contains error expectations that raise warnings if not met, as well as raising regular
  type errors.

## Usage

Not meant for actual usage (production or not). The data structures are by default only used in tests, but it is possible to just import them
in any JavaScript project after stripping all type annotations with Babel.

First, install the dependencies: `npm i && flow-typed install jest`.

- Typecheck: `npm run flow`
- Test: `npm run test`

## License

This software is released under the MIT license. See LICENSE for more informations.
