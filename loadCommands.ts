import eventpoint from "./commands/eventpoint.ts";
import skillrate from "./commands/skillrate.ts";

export function loadCommands() {
  return [eventpoint, skillrate];
}
