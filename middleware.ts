import {NextRequest, NextResponse} from "next/server";
import {getDefinitions} from "@unleash/nextjs";

// export const config = {
//     runtime: "experimental-edge",
// };



export async function middleware(req: NextRequest) {
//     const unleash = initialize({
//     url: process.env.UNLEASH_SERVER_API_URL,
//     appName: 'my-node-name',
//     customHeaders: { Authorization: process.env.UNLEASH_SERVER_API_TOKEN },
// });
    console.log("middleware");
    const definitions = await getDefinitions()
    // const context = {}; // optional, see https://docs.getunleash.io/reference/unleash-context
    // const {toggles} = evaluateFlags(definitions, context);
    // const flags = flagsClient(toggles);
    const res = NextResponse.next();
    res.headers.set('x-hello-from-middleware2', 'hello')
    return res;
}