// Campus & Building Models (Multi-tenant Architecture)
export interface Campus {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  isActive: boolean;
  adminIds: string[]; // Admins who manage this campus
  createdAt: Date;
  updatedAt: Date;
}

export interface Building {
  id: string;
  name: string;
  campusId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  floors: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  code: string; // e.g., "A101", "B205"
  buildingId: string;
  floor: number;
  capacity: number;
  roomType: 'classroom' | 'lab' | 'auditorium' | 'outdoor';
  geofence: {
    latitude: number;
    longitude: number;
    radius: number; // in meters (default 50-200m based on room type)
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  building?: string;
  room?: string;
  geofenceRadius: number; // in meters
}
