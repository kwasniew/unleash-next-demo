import { evaluateFlags, flagsClient, getDefinitions } from "@unleash/nextjs";
import {GetServerSideProps, NextPage} from "next";

type Data = {
    isEnabled: boolean;
};

const ExamplePage: NextPage<Data> = ({ isEnabled }) => (
    <>Flag status: {isEnabled ? "ENABLED" : "DISABLED"}</>
);


export const getServerSideProps: GetServerSideProps<Data> = async (ctx) => {
    const sessionId =
        ctx.req.cookies["unleash-session-id"] ||
        `${Math.floor(Math.random() * 1_000_000_000)}`;
    ctx.res.setHeader("set-cookie", `unleash-session-id=${sessionId}; path=/;`);

    const context = {
        sessionId, // needed for stickiness
        // userId: "123" // etc
    };

    const definitions = await getDefinitions(); // Uses UNLEASH_SERVER_API_URL
    const { toggles } = evaluateFlags(definitions, context);

    const flags = flagsClient(toggles); // instantiates a static (non-syncing) unleash-proxy-client

    const enabled = flags.isEnabled("example-flag");

    await flags.sendMetrics();

    return {
        props: {
            isEnabled: enabled
        },
    };
};

export default ExamplePage;