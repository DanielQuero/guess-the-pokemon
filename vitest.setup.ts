import 'reflect-metadata'
// Delete Reflect.decorate to prevent TypeError with vue-facing-decorator's class components returning options objects
delete (Reflect as any).decorate

import { container, DiContainer } from './src/diContainer'

// Initialize default bindings
new DiContainer()

beforeEach(() => {
  container.snapshot()
})

afterEach(() => {
  container.restore()
})
