// This is a mock service for demonstration
// In a real app, this would use the browser's geolocation API
// and connect to a real healthcare provider API

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  rating: number;
  distance: number; // in miles or km
}

// Mock function to get user's location
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

// Mock function to get nearby mental health professionals
export const getNearbyDoctors = async (
  specialty: string = 'all'
): Promise<Doctor[]> => {
  // In a real app, this would make an API call to a healthcare provider database
  // using the user's location to find nearby professionals
  
  // For demo purposes, return mock data
  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Psychiatrist',
      address: '123 Wellness Ave, San Francisco, CA 94110',
      phone: '(415) 555-1234',
      rating: 4.8,
      distance: 1.2,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Psychologist',
      address: '456 Mental Health Blvd, San Francisco, CA 94107',
      phone: '(415) 555-5678',
      rating: 4.9,
      distance: 2.5,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Therapist',
      address: '789 Counseling St, San Francisco, CA 94103',
      phone: '(415) 555-9012',
      rating: 4.7,
      distance: 3.1,
    },
  ];

  // Filter by specialty if specified
  if (specialty !== 'all') {
    return mockDoctors.filter(
      (doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  return mockDoctors;
};

// Get doctor details by ID
export const getDoctorDetails = async (id: string): Promise<Doctor | null> => {
  const doctors = await getNearbyDoctors();
  return doctors.find((doctor) => doctor.id === id) || null;
};

// In a real app, this service would include functions to:
// 1. Get the user's precise location (with permission)
// 2. Connect to a healthcare provider API
// 3. Filter results by specialty, distance, availability, etc.
// 4. Get detailed information about specific providers
// 5. Possibly handle appointment scheduling