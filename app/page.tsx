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

const unleash = initialize({
    url: process.env.UNLEASH_SERVER_API_URL,
    appName: 'my-node-name',
    customHeaders: { Authorization: process.env.UNLEASH_SERVER_API_TOKEN },
});

export default async function Page() {
    let data = await fetch('https://api.vercel.app/blog')
    const definitions = await getDefinitions()
    const context = {}; // optional, see https://docs.getunleash.io/reference/unleash-context
    const {toggles} = evaluateFlags(definitions, context);
    const flags = flagsClient(toggles);
    let posts = await data.json()
    return (
        <ul>
            {unleash.isEnabled('example-flag') ? <li>example post node</li> : null}
            {flags.isEnabled('example-flag') ? <li>example post next</li> : null}
            {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}

