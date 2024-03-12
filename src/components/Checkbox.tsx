import clsx from "clsx";
import { LensCategory, useQueryParams } from "@/components/useQueryParams";

export const Checkbox = ({ lensId }: { lensId: string }) => {
  const { isChecked, addLens, removeLens } = useQueryParams();

  const typeToLabel = {
    having: "所有",
    want: "欲しい",
    selling: "売りたい",
  };

  const CheckBoxItem = ({
    type,
    label,
  }: {
    type: LensCategory;
    label: string;
  }) => {
    return (
      <div
        className={clsx("flex gap-x-1 py-1 px-2 border rounded-xl", {
          "border-gray-300": !isChecked(lensId, type),
          "border-blue-400 bg-blue-100": isChecked(lensId, type),
        })}
      >
        <input
          id={lensId + type}
          type="checkbox"
          checked={isChecked(lensId, type)}
          onChange={(e) => {
            if (e.target.checked) {
              addLens(lensId, type);
            } else {
              removeLens(lensId, type);
            }
          }}
        />
        <label htmlFor={lensId + type} className={"text-xs cursor-pointer"}>
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <CheckBoxItem type={"having"} label={typeToLabel["having"]} />
      <CheckBoxItem type={"want"} label={typeToLabel["want"]} />
      <CheckBoxItem type={"selling"} label={typeToLabel["selling"]} />
    </div>
  );
};
