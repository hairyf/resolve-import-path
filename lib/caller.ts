export function caller(): string {
  // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  var origPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) { return stack; };
  var stack = (new Error()).stack;
  Error.prepareStackTrace = origPrepareStackTrace;
  // @ts-ignore
  return stack[2].getFileName();
};
