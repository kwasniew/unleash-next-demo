import {evaluateFlags, flagsClient, getDefinitions,} from "@unleash/nextjs";
import {initialize} from 'unleash-client';


// export async function getServerSideProps() {
//   // Fetch daxta from external API
//   // const res = await fetch(`https://.../data`)
//   // const data = await res.json()
//
//   // Pass data to the page via props
//   return { props: { data: "my data"} }
// }

// const unleash = initialize({
//     url: process.env.UNLEASH_SERVER_API_URL,
//     appName: 'my-node-name',
//     customHeaders: { Authorization: process.env.UNLEASH_SERVER_API_TOKEN },
// });

let metricCache: any = [];
let isSendingMetrics = false;

const sendMetricsBatch = async () => {
    if (metricCache.length === 0) return;

    // Here, send the metrics to your external service or API
    console.error('Sending metrics batch:', metricCache);
    // Clear the cache after sending
    metricCache = [];
};

const throttleMetrics = async (metric: any) => {
    // Add the metric to the cache
    metricCache.push(metric);

    // Start sending metrics every second, only once
    if (!isSendingMetrics) {
        isSendingMetrics = true;

        setInterval(async () => {
            await sendMetricsBatch();
        }, 10000); // Throttle to every 1 second
    }
};


export default async function Page({searchParams}: any) {
    console.log('searchParams', searchParams)
    console.error('Requested page', new Date())
    // let data = await fetch('https://api.vercel.app/blog')
    const definitions = await getDefinitions()
    const context = {}; // optional, see https://docs.getunleash.io/reference/unleash-context
    const {toggles} = evaluateFlags(definitions, context);
    const flags = flagsClient(toggles);
    // let posts: any = await data.json()
    throttleMetrics(Math.random());
    return (
        <ul>
            {/*{unleash.isEnabled('example-flag') ? <li>example post node</li> : null}*/}
            {flags.isEnabled('example-flag') ? <li>example post next</li> : null}
            {/*{posts.map((post: any) => (*/}
            {/*    <li key={post.id}>{post.title}</li>*/}
            {/*))}*/}
        </ul>
    )
}

