import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import {GetServerSideProps, NextPage} from "next";

type Data = {
    isEnabled: boolean;
};

export const getServerSideProps: GetServerSideProps<Data> = async () => {
    const definitions = await getDefinitions();
    const context = {};
    const { toggles } = evaluateFlags(definitions, context);
    const client = flagsClient(toggles);

    const enabled = client.isEnabled("example-flag");

    await client.sendMetrics();

    return {
        props: { isEnabled: enabled },
    };
};

const ExamplePage: NextPage<Data> = ({ isEnabled }) => (
    <>Flag status: {isEnabled ? "ENABLED" : "DISABLED"}</>
);

export default ExamplePage;

// setInterval(async () => {
//     client.sendMetrics();
// }, 5000);
//
// process.on("SIGTERM", async () => {
//     await client.sendMetrics();
//     // destroyWithFlush in node SDK

// });
