import { Lens } from "@/types/lens";
import clsx from "clsx";
import { useQueryParams } from "@/components/useQueryParams";

export const LensTableRow = ({
  children,
  lens,
}: {
  children: React.ReactNode;
  lens: Lens;
}) => {
  const { isChecked } = useQueryParams();
  return (
    <div
      className={clsx(
        "flex w-full px-4 py-3 odd:bg-emerald-50 box-border border-2",
        isChecked(lens.id, "having") &&
          "border-2 border-emerald-800 rounded relative",
        isChecked(lens.id, "want") &&
          "border-2 border-blue-400 rounded relative",
      )}
      key={lens.id}
    >
      {isChecked(lens.id, "having") && (
        <div
          className={
            "absolute top-0 left-0 rounded-br-lg bg-emerald-800 text-white font-bold py-1 px-2 text-sm"
          }
        >
          所有
        </div>
      )}
      {isChecked(lens.id, "want") && (
        <div
          className={
            "absolute top-0 left-0 rounded-br-lg bg-blue-400 text-white font-bold py-1 px-2 text-sm"
          }
        >
          欲しい
        </div>
      )}
      {children}
    </div>
  );
};
