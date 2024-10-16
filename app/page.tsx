import {evaluateFlags, flagsClient, getDefinitions,} from "@unleash/nextjs";

const definitions = await getDefinitions();
const context = {};
const {toggles} = evaluateFlags(definitions, context);
const client = flagsClient(toggles);


setInterval(async () => {
    client.sendMetrics();
}, 5000);

process.on("SIGTERM", async () => {
    await client.sendMetrics();
    // destroyWithFlush in node SDK
});

export default async function Page() {
    const enabled = client.isEnabled('example-flag');

    return (
        <ul>
            {enabled ? <li>example post next</li> : null}
        </ul>
    )
}

