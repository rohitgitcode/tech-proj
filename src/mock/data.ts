// Mock data for SafeRoute app

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  avatar?: string;
}

export interface Route {
  id: string;
  type: 'safest' | 'balanced' | 'fastest';
  distance: string;
  duration: string;
  safetyScore: number;
  lightingScore: number;
  crowdLevel: 'High' | 'Medium' | 'Low';
  incidentCount: number;
  waypoints: { lat: number; lng: number }[];
}

export interface RiskZone {
  id: string;
  lat: number;
  lng: number;
  type: 'high' | 'medium';
  label: string;
  reportCount: number;
}

export interface Report {
  id: string;
  type: 'dark-alley' | 'broken-light' | 'isolated' | 'harassment';
  location: string;
  time: string;
  verified: boolean;
  lat: number;
  lng: number;
}

export interface NavigationStep {
  instruction: string;
  distance: string;
  direction: 'straight' | 'left' | 'right' | 'destination';
  warning?: string;
}

// Mock Contacts
export const mockContacts: Contact[] = [
  { id: '1', name: 'Mom', phone: '+1 555-0101', relation: 'Family' },
  { id: '2', name: 'Sarah (Best Friend)', phone: '+1 555-0102', relation: 'Friend' },
  { id: '3', name: 'Dad', phone: '+1 555-0103', relation: 'Family' },
  { id: '4', name: 'Partner', phone: '+1 555-0104', relation: 'Partner' },
];

// Mock Routes
export const mockRoutes: Route[] = [
  {
    id: '1',
    type: 'safest',
    distance: '2.3 km',
    duration: '28 min',
    safetyScore: 92,
    lightingScore: 95,
    crowdLevel: 'High',
    incidentCount: 0,
    waypoints: [],
  },
  {
    id: '2',
    type: 'balanced',
    distance: '1.8 km',
    duration: '22 min',
    safetyScore: 75,
    lightingScore: 70,
    crowdLevel: 'Medium',
    incidentCount: 2,
    waypoints: [],
  },
  {
    id: '3',
    type: 'fastest',
    distance: '1.4 km',
    duration: '17 min',
    safetyScore: 45,
    lightingScore: 40,
    crowdLevel: 'Low',
    incidentCount: 5,
    waypoints: [],
  },
];

// Mock Risk Zones
export const mockRiskZones: RiskZone[] = [
  { id: '1', lat: 40.7128, lng: -74.006, type: 'high', label: 'Poor lighting area', reportCount: 12 },
  { id: '2', lat: 40.7148, lng: -74.009, type: 'medium', label: 'Isolated street', reportCount: 5 },
  { id: '3', lat: 40.7108, lng: -74.003, type: 'high', label: 'Recent incidents', reportCount: 8 },
  { id: '4', lat: 40.7168, lng: -74.012, type: 'medium', label: 'Construction zone', reportCount: 3 },
];

// Mock Reports
export const mockReports: Report[] = [
  { id: '1', type: 'dark-alley', location: 'Oak Street near 5th Ave', time: '2 hours ago', verified: true, lat: 40.7128, lng: -74.006 },
  { id: '2', type: 'broken-light', location: 'Main Street underpass', time: '5 hours ago', verified: true, lat: 40.7148, lng: -74.009 },
  { id: '3', type: 'isolated', location: 'Park entrance', time: '1 day ago', verified: false, lat: 40.7108, lng: -74.003 },
  { id: '4', type: 'harassment', location: 'Bus stop on 3rd Ave', time: '3 hours ago', verified: true, lat: 40.7168, lng: -74.012 },
];

// Mock Navigation Steps
export const mockNavigationSteps: NavigationStep[] = [
  { instruction: 'Head north on Main Street', distance: '200m', direction: 'straight' },
  { instruction: 'Turn left onto Oak Avenue', distance: '350m', direction: 'left' },
  { instruction: 'Continue straight past the plaza', distance: '400m', direction: 'straight', warning: 'Poor lighting ahead' },
  { instruction: 'Turn right onto Safe Street', distance: '250m', direction: 'right' },
  { instruction: 'Your destination is on the left', distance: '50m', direction: 'destination' },
];

// Report Types
export const reportTypes = [
  { id: 'dark-alley', label: 'Dark Alley', icon: 'Moon' },
  { id: 'broken-light', label: 'Broken Streetlight', icon: 'Lightbulb' },
  { id: 'isolated', label: 'Isolated Area', icon: 'TreePine' },
  { id: 'harassment', label: 'Harassment', icon: 'AlertTriangle' },
] as const;

// SOS States
export const sosStates = {
  calling: { label: 'Calling emergency contacts...', icon: 'Phone' },
  sharing: { label: 'Sharing live location...', icon: 'MapPin' },
  alerting: { label: 'Alerting nearby help...', icon: 'Bell' },
};
