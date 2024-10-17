import {evaluateFlags, flagsClient, getDefinitions,} from "@unleash/nextjs";

const definitions = await getDefinitions();
const context = {};
const {toggles} = evaluateFlags(definitions, context);
const client = flagsClient(toggles);


// reports metrics at regular intervals
setInterval(() => {
    client.sendMetrics();
}, 5000);

// reports metrics at process termination
process.on("SIGTERM", async () => {
    await client.sendMetrics();
});

export default async function _page() {
    const enabled = client.isEnabled('example-flag');

    return  <>
        Flag status: {enabled ? "ENABLED" : "DISABLED"}
    </>
}