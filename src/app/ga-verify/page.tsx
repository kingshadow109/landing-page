'use client';

import { useEffect, useState } from 'react';
import { getGADebugInfo, GA_TRACKING_ID, isGALoaded } from '@/lib/analytics';

export default function GAVerifyPage() {
  const [debugInfo, setDebugInfo] = useState<{
    hasGtag: boolean;
    hasDataLayer: boolean;
    dataLayerLength: number;
    trackingId: string;
    userAgent: string;
    url: string;
    timestamp: string;
  } | null>(null);

  const [testEventSent, setTestEventSent] = useState(false);

  useEffect(() => {
    // Get debug info
    const info = getGADebugInfo();
    setDebugInfo({
      ...info!,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });

    // Send a test event after 2 seconds
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ga_verify_test', {
          event_category: 'verification',
          event_label: 'manual_test',
          value: 1,
        });
        setTestEventSent(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sendTestEvent = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'manual_test_click', {
        event_category: 'verification',
        event_label: 'button_click',
        value: Date.now(),
      });
      alert('Test event sent! Check GA Real-time reports.');
    } else {
      alert('GA not loaded! Check console for errors.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Google Analytics Verification</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Tracking ID</h2>
          <p className="text-2xl font-mono text-blue-700">{GA_TRACKING_ID}</p>
        </div>

        {debugInfo ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${debugInfo.hasGtag ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="font-semibold">gtag loaded:</p>
                <p className="text-2xl">{debugInfo.hasGtag ? '✅' : '❌'}</p>
              </div>
              <div className={`p-4 rounded-lg ${debugInfo.hasDataLayer ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="font-semibold">dataLayer loaded:</p>
                <p className="text-2xl">{debugInfo.hasDataLayer ? '✅' : '❌'}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <pre className="text-sm overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">dataLayer Contents:</h3>
              <pre className="text-xs overflow-auto max-h-64">
                {typeof window !== 'undefined' && window.dataLayer 
                  ? JSON.stringify(window.dataLayer.slice(-10), null, 2)
                  : 'Not available'}
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={sendTestEvent}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Test Event
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Reload Page
              </button>
            </div>

            {testEventSent && (
              <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                ✅ Auto test event sent! Check your GA Real-time reports.
              </div>
            )}
          </div>
        ) : (
          <p>Loading debug information...</p>
        )}

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">Verification Steps:</h3>
          <ol className="list-decimal list-inside space-y-1 text-yellow-800">
            <li>Open Google Analytics: <a href="https://analytics.google.com" className="underline" target="_blank" rel="noopener">analytics.google.com</a></li>
            <li>Select the WearX property</li>
            <li>Go to "Reports" → "Realtime" (left sidebar)</li>
            <li>You should see this pageview in the realtime report</li>
            <li>Click "Send Test Event" button above</li>
            <li>Check if the event appears in realtime (within 30 seconds)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
