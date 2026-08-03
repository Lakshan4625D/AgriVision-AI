import { useRef } from "react";
import { UploadCloud } from "lucide-react";

interface Props {
  file: File | null;
  setFile: (file: File) => void;
}

export default function ImageUploader({
  file,
  setFile,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    setFile(e.target.files[0]);
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-8">

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      <div className="flex flex-col items-center">

        <UploadCloud
          size={60}
          className="text-blue-600"
        />

        <h3 className="mt-4 text-lg font-semibold">
          Upload Crop Image
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          JPG, PNG or JPEG
        </p>

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          Browse Image
        </button>

        {file && (
          <div className="mt-6 text-center">
            <img
              src={URL.createObjectURL(file)}
              className="mx-auto h-56 rounded-xl object-cover shadow"
            />

            <p className="mt-3 text-sm font-medium">
              {file.name}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}