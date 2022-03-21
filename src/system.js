/**
 * System.js creates the Design System Library.
 * It’s used in the system itself and when exporting it.
 *
 * You should & can add your own dependencies here if needed.
 */

import "./styles/styles.scss"
import sortMixin from "./mixins/sort.js"
import { getSizeClass } from "./utils/sizeClasses.js"
import OcTable from "./components/molecules/OcTable/OcTable.vue"

export * as constants from "./helpers/constants.js"
export const mixins = { sortMixin }
export const utils = { sizeClasses: { getSizeClass } }
export const components = { OcTable }

// Define contexts to require
const componentsContext = require.context("./components/", true, /\.vue$/)
const directivesContext = require.context("./directives/", true, /\.js$/)

const initializeCustomProps = (tokens = [], prefix) => {
  for (const param in tokens) {
    document.querySelector(":root").style.setProperty("--oc-" + prefix + param, tokens[param])
  }
}

// Install the above defined components
const System = {
  install(Vue, options = {}) {
    const themeOptions = options.tokens
    initializeCustomProps(themeOptions?.breakpoints, "breakpoint-")
    initializeCustomProps(themeOptions?.colorPalette, "color-")
    initializeCustomProps(themeOptions?.fontSizes, "font-size-")
    initializeCustomProps(themeOptions?.sizes, "size-")
    initializeCustomProps(themeOptions?.spacing, "space-")

    componentsContext
      .keys()
      .forEach(key =>
        Vue.component(componentsContext(key).default.name, componentsContext(key).default)
      )
    directivesContext
      .keys()
      .forEach(key =>
        Vue.directive(directivesContext(key).default.name, directivesContext(key).default)
      )
  },
}

// Finally export as default
export default System
