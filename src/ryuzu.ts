export type PeriodOptions = {
  fn: Record<string, number>;
  log: boolean;
};

export interface Ryuzu {
  start(): void;
  end(): void;
}

function createPeriod(options: Partial<PeriodOptions>): Ryuzu {
  const config = mergeOptions_(options);
  const functionNames = Object.keys(config.fn);
  const endPeriod = (): void => {
    const triggers = ScriptApp.getProjectTriggers();
    for (const trigger of triggers) {
      const handler = trigger.getHandlerFunction();
      const uid = trigger.getUniqueId();
      if (functionNames.indexOf(handler) > -1) {
        ScriptApp.deleteTrigger(trigger);

        if (config.log) {
          Logger.log(`Ryuzu.period.end(): delete trigger "${handler}" [${uid}]`);
        }
      }
    }
  };
  const controller: Ryuzu = {
    start: () => {
      for (const fn of functionNames) {
        const m = config.fn[fn];
        const t = ScriptApp.newTrigger(fn).timeBased().everyMinutes(m).create();

        if (config.log) {
          Logger.log(`Ryuzu.period.start(): create trigger "${fn}" [${t.getUniqueId()}]`);
        }
      }
    },
    end: endPeriod,
  };

  return controller;
}

function mergeOptions_(options: Partial<PeriodOptions>): PeriodOptions {
  return Object.assign({}, { log: false, fn: {} }, options);
}
