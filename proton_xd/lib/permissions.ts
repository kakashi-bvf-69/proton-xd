import Config from "../types/config.ts";



export default async function getPermissions(config: Config): Promise<string[]> {
  type Flags="env"|"sys"|"net"|"ffi"|"run"|"hrtime"|"read"|"write";
  const keys: Flags[]=["env","sys","net","ffi","run","hrtime","read","write"];
  const flags: string[]=[];
  

  try {
    for await(const flag of keys) {
      const permission=config.permissions[flag];
      switch(typeof permission) {
        case "boolean":
          if(permission) flags.push(`--allow-${flag}`);
        break;
        case "object":
          if(permission.length) flags.push(`--allow-${flag}=${permission.join(",")}`);
        break;
        default:
        break;
      }
    }
  } catch {
    Deno.exit(1);
  }
  return flags;
}

