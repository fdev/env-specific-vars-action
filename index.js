'use strict'

const core = require('@actions/core')

/**
 * Iterates over properties of `object`, returning an object with all elements
 * that have a key that matches `prefix` with the prefix removed from the key.
 */
function filterObjectByPrefix(object, prefix) {
  const prefixUpper = prefix.toUpperCase()

  return Object
    .keys(object)
    .filter(key => key.toUpperCase().startsWith(prefixUpper))
    .reduce((acc, key) => {
      acc[key.slice(prefix.length)] = object[key];
      return acc;
    }, {});
}

/**
 * Return all environment variables that apply to `environment`.
 */
function getVariables(environment) {
  const vars = process.env

  const defaultVars = filterObjectByPrefix(vars, 'default_')
  const envVars = filterObjectByPrefix(vars, `${environment}_`)

  // Let environment specific vars override default vars.
  return Object.assign({}, defaultVars, envVars);
}

/**
 * Entrypoint of the action.
 */
async function run() {
  try {
    const environment = core.getInput('environment', { required: true })
    const shouldExport = core.getBooleanInput('export')

    core.info(`Determine variables for environment ${environment}`)

    const vars = getVariables(environment)
    Object.entries(vars).forEach(([key, value]) => {
      core.setOutput(key, value)
    })

    if (shouldExport) {
      core.info(`Exporting as environment variables`)
      Object.entries(vars).forEach(([key, value]) => {
        core. exportVariable(key, value)
      })
    }
  }
  catch (err) {
    core.setFailed(err.message)
  }
}

if (require.main === module) {
  run()
}
