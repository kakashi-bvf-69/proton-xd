import Args,{ FLAGS } from "../types/webview.ts";
import { NPMPackage } from "../types/config.ts";
import Thread from "./Thread.ts";

export default class NeutronXD {
  private path: string;
  private args: string[]=[];
  private worker?: Thread;
  private frontEnd?: Deno.Process<{cmd: string[];cwd: string;}>;
  constructor(backend: boolean=false) {
    this.path=this.getFilePath();
    if(backend) this.worker=new Thread(new URL(`../../src/server.ts`,import.meta.url).href,["--allow-net"]);
    // replace it with rust server
  }

  private getFilePath(): string {
    switch(Deno.build.os) {
      case "windows":
        return "./proton_xd/.bin/windows/webview.exe";
      case "darwin":
        return "./proton_xd/.bin/darwin/";
      case "linux":
        return "./proton_xd/.bin/linuix/";
      default:
        return "./proton_xd/.bin/linuix/";
    }
  }
  /**
   * @param argv - an two dimentional spread array: [["-title","my-app"],["--url","http://localhost:6969"],["--width",480],["--height",1080]]
   */
  public setArgs(args: Args): void {
    for(const flag of FLAGS) {
      if(!Object.prototype.hasOwnProperty.call(args,flag)) continue;
      const arg=args[flag];
      arg && this.args.push(`--${flag}`,typeof arg=="string"?arg:arg.toString());
    }
  }

  public async init() {
    const cmd=new Deno.Command(this.path,{args: this.args});
    const out=cmd.outputSync();
    if(out.success)
      Deno.stdout.writeSync(out.stdout);
    else
      Deno.stderr.writeSync(out.stderr);
    this.worker && this.worker.terminate();
    this.frontEnd && await this.killFrontEnd();
  }
  
  public useDiffrentFrontEnd(process: string="npm run dev") {
    const split=process.split(" ");
    this.frontEnd=Deno.run({
      cmd: this.getCommand(split[split.length-1]),
      cwd: "./public"
    });
  }


  private getCommand(script: string) {
    const pkg: NPMPackage=JSON.parse(new TextDecoder().decode(Deno.readFileSync("./public/package.json")));
    const task=pkg.scripts[script].split(" ");
    return Deno.build.os=="windows"?task.with(0,`./public/node_modules/.bin/${task[0]}.cmd`):task.with(0,`./public/node_modules/.bin/${task[0]}`);
  }
  
  private async killFrontEnd() {
    if (!this.frontEnd) return;
    // const path=Deno.makeTempFileSync({
    //   dir: "./proton_xd/lib/temp",
    //   prefix: "thread",
    //   suffix: ".ts"
    // });
    // Deno.writeFileSync(path,new TextEncoder().encode(`Deno.kill(${this.frontEnd.pid});self.close();`));
    // new Thread(new URL(path,import.meta.url).href);
    // Deno.removeSync(path);
    Deno.kill(this.frontEnd.pid);
    
  }
}



const DEFAULT_URL="http://localhost:6969",DEFAULT_PORT=6969;
export {
  DEFAULT_URL,
  DEFAULT_PORT
};