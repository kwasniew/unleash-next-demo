import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import {GetServerSideProps, NextPage} from "next";

type Data = {
    isEnabled: boolean;
};

export const getServerSideProps: GetServerSideProps<Data> = async () => {
    console.time('serverSideProps');
    const definitions = await getDefinitions({
        fetchOptions: { next: { revalidate: 15 } }
    });
    const context = {};
    const { toggles } = evaluateFlags(definitions, context);
    let client = flagsClient(toggles);

    const enabled = client.isEnabled("example-flag");
    console.timeEnd('serverSideProps');

    console.log('sending metrics', new Date());
    client.sendMetrics().catch(() => {});

    return {
        props: { isEnabled: enabled },
    };
};

const ExamplePage: NextPage<Data> = ({ isEnabled }) => (
    <>Flag status: {isEnabled ? "ENABLED" : "DISABLED"}</>
);

export default ExamplePage;

// let client = null;
// setInterval(async () => {
//     client?.sendMetrics();
// }, 5000);

// setInterval(async () => {
//     client.sendMetrics();
// }, 5000);
//
// process.on("SIGTERM", async () => {
//     await client.sendMetrics();
//     // destroyWithFlush in node SDK

// });
