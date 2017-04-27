const chalk = require('chalk')
const sprintf = require('sprintf').sprintf
const util = require('util')
const cluster = require('cluster')
const defer = global.setImmediate || process.nextTick

const slice = Array.prototype.slice
const projectPath = /(.*)(node_modules)(.*)(\.js)$/i.exec(__filename)[1]
const nodeVersion = /v(\d*)\.(\d*)(\.(\d*))?$/i.exec(process.version)[1]
const switcher = false

const nodeRef = {
  '6': 'https://nodejs.org/dist/latest-v6.x/docs/api/',
  '7': 'https://nodejs.org/dist/latest-v7.x/docs/api/'
}
const nodeSrcRef = {
  '7': {
    'module.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_http_agent.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_http_client.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_http_common.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_http_incoming.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_http_outgoing.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_http_server.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_stream_duplex.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_stream_passthrough.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_stream_readable.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_stream_transform.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_stream_wrap.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_stream_writable.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_tls_common.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_tls_legacy.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    '_tls_wrap.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'assert.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'buffer.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'child_process.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'cluster.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'console.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'constants.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'crypto.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'dgram.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'dns.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'domain.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'events.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'fs.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'http.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'https.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'module.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'net.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'os.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'path.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'process.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'punycode.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'querystring.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'readline.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'repl.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'stream.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'string_decoder.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'sys.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'timers.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'tls.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'tty.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'url.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'util.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'v8.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'vm.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'zlib.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/bootstrap_node.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/buffer.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/child_process.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/errors.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/freelist.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/fs.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/http.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/linkedlist.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/module.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/net.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/process.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/querystring.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/readline.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/repl.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/socket_list.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/url.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/util.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/v8_prof_polyfill.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/v8_prof_processor.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/cluster/child.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/cluster/master.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/cluster/round_robin_handle.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/cluster/shared_handle.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/cluster/utils.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/cluster/worker.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/process/next_tick.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/process/promises.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/process/stdio.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/process/warning.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/process/write-coverage.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/streams/BufferList.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/streams/lazy_transform.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/streams/egacy.js': 'https://github.com/nodejs/node/blob/v7.x/lib/',
    'internal/test/unicode.js': 'https://github.com/nodejs/node/blob/v7.x/lib/'
  }
}

module.exports = {
  isFlow: true,
  log() {
    this.isFlow = false
    this.stack(arguments)
  },
  stack(...args) {

    const flowList = flow()
    let symInfo = 'stack'

    symInfo = args

    const processId = process.pid
    // console.log('cluster workers: ', cluster.workers)
    // for (var id in cluster.workers) {
    //   console.log('worker id: ', cluster.workers[id])
    //   if (cluster.workers[id].process.pid == processId) {
    //     processId = `App Worker#${id}:${processId}`
    //   }
    // }

    console.log(chalk.white.bold(util.format("\n[%s] 🚀 ", new Date())))
    console.log('  Platform: ' + chalk.white.bold(process.platform))
    console.log('  Pid: ' + chalk.white.bold(processId))
    // console.log('Channel: ' +  chalk.white.bold(process.channel))
    console.log('  NodeJS: ' + chalk.white.bold(process.version))
    // console.log('  Tracer: ' + chalk.yellow.bold(util.format("%j", symInfo)))
    console.log('  Info: ', symInfo)
    if (this.isFlow) {
      console.log(flowList)
    }
    console.log("\n")
    this.isFlow = true

    /**
     * @returns
     */
    function flow() {
      Error.stackTraceLimit = Infinity
      const stacklist = (new Error()).stack.split('\n').splice(3)
      // console.trace()
      // console.log('traceinfo', traceinfo)

      // console.log("typeof ", typeof traceinfo)
      // const stacklist = traceinfo.split('\n').slice(1)
      const stackset = []
      if (stacklist && stacklist.length > 0) {
        // console.log(stacklist)
        let i = []
        stacklist.map(s => {
          const stack = stackfactor(s)
          const cascading = i.join('') + (i.length > 0 ? '↘︎⎼ ' : ' ')
          stack.method && stackset.push(chalk.gray(`  ${i.length+1} ➜`) + `${cascading}` +  chalk.green.bold(util.format("%s", stack.method)) + ` [${stack.line}:${stack.pos}] ` + chalk.gray.bold(stack.source)) && i.push('  ')
        })
        // stacklist.push(`${cascading} ` + chalk.bgWhite('🔚'))
      }
      return stackset.join('\n')
    }

    function stackfactor (s) {
      const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i
      const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i
      const stackReg3 = /(.*)\(((.*)(\.js)):(\d*):(\d*)\)$/i
      const sp = stackReg.exec(s) || stackReg2.exec(s)
      let stack = { line: 0 }
      if (sp && sp.length === 5) {
        const fileStack = stackReg3.exec(sp[2])
        let source = sp[2].replace(projectPath, '')
        if (nodeSrcRef[nodeVersion] && nodeSrcRef[nodeVersion][source])[
          source =  source + ' 🔗 ' +  nodeSrcRef[nodeVersion][source] + source + '#L' + sp[3]
        ]

        stack.method = sp[1]
        stack.line = sp[3]
        stack.pos = sp[4]
        stack.source = source
      } else {
        stack.method = '<method>'
        stack.line = '<line>'
        stack.pos = '<pos>'
        stack.source = s.trim()
      }
      return stack
    }

    return {
      disable: function () {
        isFlow = false
      },
      enable: function () {
        isFlow = true
      }
    }
  }
}
