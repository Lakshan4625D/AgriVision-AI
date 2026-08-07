export interface LocationData {
  latitude: number;
  longitude: number;
}

export function getCurrentLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
}