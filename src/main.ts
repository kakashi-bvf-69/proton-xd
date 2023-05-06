import NeutronXD from "../proton_xd/lib/lib.ts";

const neutronXd=new NeutronXD();

neutronXd.setArgs({
  url: "http://localhost:3000/"
});
await neutronXd.init();

