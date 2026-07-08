/* Host-provided ReactDOM — same instance as the main app */
const R = window.__ASTRIBOT_SHARED__.ReactDOM;
export default R;
export const { createPortal, flushSync } = R;
