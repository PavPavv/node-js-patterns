# my-node-js-study

> Examples and lessons from "Node.js design patterns: third edition, 2020" by M. Casciaro and L.Mammino

## Design patterns

### Node.js patterns

1. (1) Callback error-first pattern (see ./module3/ticker.js)
2. (2) Observer pattern (see ./module3/homework1-1.js)

### Creation patterns

1. (3) Factory (see ./utils-classes/profiler.js)
2. (4) Builder (see ./module7/url-builder.js)
3. (5) Revealing constructor (see ./module7/immutable-buffer.js)
4. (6) Singleton (see ./module7/singleton.js)
5. (7) Dependency injection (pass module into constructor and init its instance somewhere in the current class afterwards)

### Structural patterns

1. (8) Proxy (surrogate) (see ./module8/calculator.js)
2. (9) Decorator (see ./module8/calculator.js)
3. (10) Adapter

### Behavioral patterns

1. (11) Strategy (see ./module9/multi-config)
2. (12) State (see ./module9/failsafe-socket)
3. (13) Template (see ./module9/config-template)
4. (14) Iterator (see ./module9/iterator)
5. (15) Middleware (see ./module9/middleware/0-mq-messenger)
6. (16) Command (see ./module9/command/status-service)
    - 6.1 Task pattern (see ./module9/command/task.js)
