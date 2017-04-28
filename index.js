const reference =  require('./lib/reference')
const chalk = require('chalk')
const util = require('util')
const path = require('path')

const slice = Array.prototype.slice
console.log(__filename)

let projectPath = ''
if ( (project = /(.*)(node_modules)(.*)(\.js)$/i.exec(__filename)) !== null) {
  projectPath = project[1]
}

const nodeVersion = /v(\d*)\.(\d*)(\.(\d*)(.*)?)?$/i.exec(process.version)[1]
const switcher = false

nodeSrcRef = reference.nodeSrcRef
nodeRef = reference.nodeRef

module.exports = {
  isFlow: true,
  log() {
    this.isFlow = false
    this.stack.apply(this,arguments)
  },
  stack(...args) {
    if (!this.isDebug()) {return }
    const flowList = flow()
    let symInfo = 'stack'

    symInfo = args

    const processId = process.pid

    console.log(chalk.white.bold(util.format("\n[%s] 🚀 ", new Date())))
    console.log('  Platform: ' + chalk.white.bold(process.platform))
    console.log('  Pid: ' + chalk.white.bold(processId))
    console.log('  NodeJS: ' + chalk.white.bold(process.version))
    console.log('  Info: ', ...symInfo)
    if (this.isFlow) {
      let i = 1

      flowList.map(f => {
        console.log(chalk.gray(`  ${i} ➜`) + f )
        i++
      })
    } else {
			console.log(flowList[1])
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
      console.log(stacklist)
      if (stacklist && stacklist.length > 0) {
        // console.log(stacklist)
        let i = []
        stacklist.map(s => {
          const stack = stackfactor(s)
          const cascading = i.join('') + (i.length > 0 ? '↘︎⎼ ' : ' ')
          stack.method && stackset.push(`${cascading}` +  chalk.green.bold(util.format("%s", stack.method)) + ` [${stack.line}:${stack.pos}] ` + chalk.gray.bold(stack.source)) && i.push('  ')
        })
        // stacklist.push(`${cascading} ` + chalk.bgWhite('🔚'))
      }
      return stackset
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
  },

  isDebug() {
    let isDebug = false
    for (const arg of process.execArgv) {
      if (arg.indexOf('--debug') !== -1) {
        isDebug = true
        break
      }
    }
    if (!isDebug) {
      return  typeof v8debug !== 'undefined'
    } else {
      return isDebug
    }
  }
}
