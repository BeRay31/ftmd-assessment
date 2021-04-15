import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// This condition actually should detect if it's an Node environment
if (typeof require.context === 'undefined') {
  const fs = require('fs')
  const path = require('path')

  require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
    const files = {}

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file)

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath)

          return
        }

        if (!regularExpression.test(fullPath)) return

        files[fullPath] = true
      })
    }

    readDirectory(path.resolve(__dirname, base))

    function Module(file) {
      return require(file)
    }

    Module.keys = () => Object.keys(files)

    return Module
  }
}

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
// console.log(modulesFiles)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

// console.log(store)

export default store
