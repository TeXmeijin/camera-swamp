import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export const Checkbox = ({ lensId }: { lensId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isChecked = (lensId: string, type: "having" | "want" | "selling") => {
    return searchParams.getAll(type).includes(lensId);
  };
  const addLens = (lensId: string, type: "having" | "want" | "selling") => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.append(type, lensId);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };
  const removeLens = (lensId: string, type: "having" | "want" | "selling") => {
    const newParams = new URLSearchParams(searchParams.toString());
    // paramsから、そのlensIdのみを削除します
    const currentLensIds = searchParams.getAll(type);
    newParams.delete(type);
    currentLensIds
      .filter((id) => id !== lensId)
      .forEach((id) => newParams.append(type, id));
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const typeToLabel = {
    having: "所有",
    want: "欲しい",
    selling: "売りたい",
  };

  const CheckBoxItem = ({
    type,
    label,
  }: {
    type: "having" | "want" | "selling";
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
