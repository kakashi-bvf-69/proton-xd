import Config from "../types/config.ts";
import getPermissions from "../lib/permissions.ts";
const config: Config=await JSON.parse(new TextDecoder().decode(Deno.readFileSync("./config.json")));

Deno.stdout.writeSync(new TextEncoder().encode((await getPermissions(config)).join(" ")));
