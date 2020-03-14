import debug from "debug";

debug.enable('*');

export default createLogger('heighgo');

export function createLogger(namespace: string): debug.Debugger {
  return debug(namespace);
}
