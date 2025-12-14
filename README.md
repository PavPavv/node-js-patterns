# my-node-js-study

> Examples and lessons from "Node.js design patterns: third edition, 2020" by M. Casciaro and L.Mammino

## Design patterns

### Node.js patterns

1. (1) Callback error-first pattern (see ./module3/ticker.js)
2. (2) Observer pattern (see ./module3/homework1-1.js)

### Creation patterns

1. (3) Factory (see .src/modules/utils-classes/profiler.js)
2. (4) Builder (see .src/modules/module7/url-builder.js)
3. (5) Revealing constructor (see .src/modules/module7/immutable-buffer.js)
4. (6) Singleton (see .src/modules/module7/singleton.js)
5. (7) Dependency injection (pass module into constructor and init its instance somewhere in the current class afterwards)

### Structural patterns

1. (8) Proxy (surrogate) (see .src/modules/module8/calculator.js)
2. (9) Decorator (see .src/modules/module8/calculator.js)
3. (10) Adapter

### Behavioral patterns

1. (11) Strategy (see .src/modules/module9/multi-config)
2. (12) State (see .src/modules/module9/failsafe-socket)
3. (13) Template (see .src/modules/module9/config-template)
4. (14) Iterator (see .src/modules/module9/iterator)
5. (15) Middleware (see .src/modules/module9/middleware/0-mq-messenger)
6. (16) Command (see .src/modules/module9/command/status-service)
    - 6.1 Task pattern (see .src/modules/module9/command/task.js)
