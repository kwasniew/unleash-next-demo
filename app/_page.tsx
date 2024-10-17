import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";

export async function getServerSideProps() {
    const definitions = await getDefinitions();
    const context = {};
    const { toggles } = evaluateFlags(definitions, context);
    const client = flagsClient(toggles);

    const enabled = client.isEnabled("example-flag");

    await client.sendMetrics();

    return {
        props: { enabled }, // Pass the flag value as a prop to the page
    };
}

export default function _page({ enabled }) {
    return (
        <ul>
            {enabled ? <div>ENABLED</div> : <div>DISABLED</div>}
        </ul>
    );
}

// setInterval(async () => {
//     client.sendMetrics();
// }, 5000);
//
// process.on("SIGTERM", async () => {
//     await client.sendMetrics();
//     // destroyWithFlush in node SDK
// });