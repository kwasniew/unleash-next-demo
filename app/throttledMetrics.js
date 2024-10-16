// /pages/api/metrics.js
let metricCache = [];
let isSendingMetrics = false;

const sendMetricsBatch = async () => {
    if (metricCache.length === 0) return;

    // Here, send the metrics to your external service or API
    console.log('Sending metrics batch:', metricCache);
    // Clear the cache after sending
    metricCache = [];
};

const throttleMetrics = async (metric) => {
    // Add the metric to the cache
    metricCache.push(metric);

    // Start sending metrics every second, only once
    if (!isSendingMetrics) {
        isSendingMetrics = true;

        setInterval(async () => {
            await sendMetricsBatch();
        }, 1000); // Throttle to every 1 second
    }
};

export default async function handler(req, res) {
    // Your main logic here
    const metric = {
        name: 'response_time',
        value: Math.random() * 1000, // Example metric
    };

    await throttleMetrics(metric);

    res.status(200).json({ success: true });
}
