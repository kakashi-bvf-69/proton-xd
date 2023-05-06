import getPermissions from "./permissions.ts";
import Config from "../types/config.ts";


const config: Config=await JSON.parse(new TextDecoder().decode(Deno.readFileSync("./config.json")));
const permissions=await getPermissions(config);
permissions.unshift("deno","run");

export default class Thread {
  private process;
  constructor(path: string,perms: string[]=[]) {
    permissions.push(...perms,path);
    this.process=Deno.run({
      cmd: permissions
    });
  }
  public terminate() {
    this.process.kill();
  }
}