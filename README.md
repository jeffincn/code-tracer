# code-tracer

提供一种在 Terminal 环境下对代码位置的执行堆栈进行跟踪，并提供nodejs版本提供核心模型中提供的方法github库上的链接访问，该插件主要用于对源代码研究和代码执行逻辑的学习及跟踪的需要。

## 如何使用

安装

```
npm install --save code-tracer
```

使用

` 在--debug模式下将启用日志打印功能 `

```
var tracer = require('code-tracer');

// 打印当前的信息，类似console.log
tracer.log('I am watching');

// 打印当前位置的代码堆栈信息
tracer.stack('What is stacks?');

```
`tracer.log` 输出结果

```
[Thu Apr 27 2017 18:07:11 GMT+0800 (CST)] 🚀
  Platform: darwin
  Pid: 36241
  NodeJS: v7.9.0
  Info:  I am watching
  ↘︎⎼ HomeController.index [7:14] app/controller/home.js

```


`tracer.stack` 输出结果

```
[Thu Apr 27 2017 18:03:32 GMT+0800 (CST)] 🚀
  Platform: darwin
  Pid: 34024
  NodeJS: v7.9.0
  Info:  'What is stacks?'
  1 ➜ HomeController.index [7:14] app/controller/home.js
  2 ➜  ↘︎⎼ Object.classControllerMiddleware [77:32] node_modules/egg-core/lib/loader/mixin/controller.js
  3 ➜    ↘︎⎼ <method> [<line>:<pos>] at classControllerMiddleware.next (<anonymous>)
  4 ➜      ↘︎⎼ Object.dispatch [339:14] node_modules/koa-router/lib/router.js
  5 ➜        ↘︎⎼ <method> [<line>:<pos>] at dispatch.next (<anonymous>)
  6 ➜          ↘︎⎼ onFulfilled [69:19] node_modules/co/index.js
  7 ➜            ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  8 ➜              ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  9 ➜                ↘︎⎼ next [105:29] node_modules/co/index.js
  10 ➜                  ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  11 ➜                    ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  12 ➜                      ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  13 ➜                        ↘︎⎼ next [105:29] node_modules/co/index.js
  14 ➜                          ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  15 ➜                            ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  16 ➜                              ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  17 ➜                                ↘︎⎼ next [105:29] node_modules/co/index.js
  18 ➜                                  ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  19 ➜                                    ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  20 ➜                                      ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  21 ➜                                        ↘︎⎼ next [105:29] node_modules/co/index.js
  22 ➜                                          ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  23 ➜                                            ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  24 ➜                                              ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  25 ➜                                                ↘︎⎼ next [105:29] node_modules/co/index.js
  26 ➜                                                  ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  27 ➜                                                    ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  28 ➜                                                      ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  29 ➜                                                        ↘︎⎼ next [105:29] node_modules/co/index.js
  30 ➜                                                          ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  31 ➜                                                            ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  32 ➜                                                              ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  33 ➜                                                                ↘︎⎼ next [105:29] node_modules/co/index.js
  34 ➜                                                                  ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  35 ➜                                                                    ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  36 ➜                                                                      ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  37 ➜                                                                        ↘︎⎼ next [105:29] node_modules/co/index.js
  38 ➜                                                                          ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  39 ➜                                                                            ↘︎⎼ Object.co [52:10] node_modules/co/index.js
  40 ➜                                                                              ↘︎⎼ Object.toPromise [124:63] node_modules/co/index.js
  41 ➜                                                                                ↘︎⎼ next [105:29] node_modules/co/index.js
  42 ➜                                                                                  ↘︎⎼ onFulfilled [74:7] node_modules/co/index.js
  43 ➜                                                                                    ↘︎⎼ process._tickCallback [109:7] internal/process/next_tick.js 🔗 https://github.com/nodejs/node/blob/v7.x/lib/internal/process/next_tick.js#L109


```