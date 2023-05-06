import getPermissions from "./permissions.ts";
import Config from "../types/config.ts";


const config: Config=await JSON.parse(new TextDecoder().decode(Deno.readFileSync("./config.json")));
const permissions=await getPermissions(config);

export default class Thread {
  private process;
  constructor(path: string,perms: string[]=[]) {
    permissions.push(...perms,path);
    
    this.process=new Deno.Command("deno",{
      args: ["run"].concat(permissions)
    }).spawn();
  }
  public terminate() {
    this.process.kill();
  }
}