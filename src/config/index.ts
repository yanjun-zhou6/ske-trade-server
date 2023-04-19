import development from './env.dev'
import production from './env.prod'
import test from './env.tests'

export default {
  development,
  production,
  test,
}[process.env.NODE_ENV ?? 'development']!
