import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetricsProvider } from "@cabify/prom-react";

const normalizePath = (path) => {
  console.log(path, 'PATH----')
  const match = path.match(/\/\/(\d+)/);
  if (match) {
    return `/`;
  }
  return path;
};

// please remember to define them outside the component to avoid unneeded re-renders
const customMetrics = [
    {
      type: 'counter',
      name: 'bookings_event',
      description: 'Number of times booking was triggred',
    },
    {
      type: 'counter',
      name: 'admin_visits',
      description: 'Number of visits to website',
    },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetricsProvider
    appName="User UI"
    owner="app"
    getNormalizedPath={normalizePath}
    metricsAggregatorUrl="https://webhook.site/f0d2b229-95f2-4f6f-bb77-7936306e6bc1"  // To be replaced with prometheus gateway URL. This URL is only for local testing 
    customMetrics={customMetrics}
  >
    <App />
  </MetricsProvider>
);

reportWebVitals();
