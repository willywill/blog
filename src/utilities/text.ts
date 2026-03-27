const terminalPunctuation = /[.!?…]$/;

export const withTerminalPeriod = (text: string) =>
  terminalPunctuation.test(text) ? text : `${text}.`;
