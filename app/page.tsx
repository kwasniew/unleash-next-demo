import {evaluateFlags, flagsClient, getDefinitions,} from "@unleash/nextjs";

export default async function Page({searchParams}: any) {
    const definitions = await getDefinitions()
    const context = {};
    const {toggles} = evaluateFlags(definitions, context);
    const client = flagsClient(toggles);
    const enabled = client.isEnabled('example-flag');
    await client.sendMetrics();
    return (
        <ul>
            {enabled ? <li>example post next</li> : null}
        </ul>
    )
}

