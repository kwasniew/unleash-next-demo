import {evaluateFlags, flagsClient, getDefinitions,} from "@unleash/nextjs";


// setInterval(async () => {
//     client.sendMetrics();
// }, 5000);
//
// process.on("SIGTERM", async () => {
//     await client.sendMetrics();
//     // destroyWithFlush in node SDK
// });

export default async function Page() {
    const definitions = await getDefinitions();
    const context = {};
    const {toggles} = evaluateFlags(definitions, context);
    const client = flagsClient(toggles);
    const enabled = client.isEnabled('example-flag');

    await client.sendMetrics()

    return (
        <ul>
            {enabled ? <div>ENABLED</div> : <div>DISABLED</div>}
        </ul>
    )
}

