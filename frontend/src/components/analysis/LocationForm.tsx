import Input from "../ui/Input";

interface Props {
  latitude: string;
  longitude: string;

  setLatitude: (v: string) => void;
  setLongitude: (v: string) => void;
}

export default function LocationForm({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}: Props) {
  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold">
        Farm Coordinates
      </h3>

      <div>

        <label className="mb-2 block">
          Latitude
        </label>

        <Input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="23.4567"
        />

      </div>

      <div>

        <label className="mb-2 block">
          Longitude
        </label>

        <Input
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="76.5432"
        />

      </div>

    </div>
  );
}