/* Host-provided @astribot/stores — shared Zustand stores */
const S = window.__ASTRIBOT_SHARED__.Stores;
export default S;
export const {
  // App store
  useAppStore,
  // Robot store
  useRobotStore,
  getRobotHttpClient,
  useMetaStatus,
  useIsMetaActive,
  // Hardware store
  useHardwareStore,
  useIsPowerOn,
  useIsDriverActive,
  useIsCameraDriverOn,
  useIsSpeakerOn,
  useIsMicrophoneOn,
  useHardwareError,
  useBatterySoc,
  // Auth store
  useAuthStore,
  configureCloudApi,
  // Network store
  useNetworkStore,
  useIsOnline,
  useIsApMode,
} = S;
