import { serve } from "https://deno.land/std@0.183.0/http/server.ts";

const handler=(req: Request)=> new Response("hello world");
await serve(handler,{port: 6969});