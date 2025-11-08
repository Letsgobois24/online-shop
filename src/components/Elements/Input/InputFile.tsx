import type { ChangeEvent, Dispatch, SetStateAction } from "react";

type ImageInfo = File | null;

type PropTypes = {
  name: string;
  changeFile: ImageInfo;
  setChangeFile: Dispatch<SetStateAction<ImageInfo>>;
  required?: boolean;
  error?: string;
};

const InputFile = ({
  name,
  changeFile,
  setChangeFile,
  required = true,
  error,
}: // handleChangeFile,
PropTypes) => {
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    setChangeFile(file);
  };

  return (
    <div className="border border-slate-500 bg-slate-200 hover:bg-slate-300 rounded-lg shadow-md flex flex-col">
      <label
        htmlFor={name}
        className="text-sm text-center cursor-pointer min-h-24 flex flex-col justify-center"
      >
        {!changeFile ? (
          <div className="p-2">
            <p className="text-gray-600">
              Maximum upload size is <b>1 MB</b>
            </p>
            <p className="">
              Upload a new avatar, larger image will be resized automatically
            </p>
          </div>
        ) : (
          <p className="text-gray-600 p-2">{changeFile.name}</p>
        )}

        <input
          className="hidden w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          name={name}
          id={name}
          type="file"
          onChange={(e) => handleChangeFile(e)}
          required={required}
        ></input>
        <p className="h-2 mt-1 ml-1 text-xs text-red-600">{error}</p>
      </label>
    </div>
  );
};

export default InputFile;
