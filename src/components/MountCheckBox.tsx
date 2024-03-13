"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

const MASTER_MOUNTS = ["L", "RF", "MFT", "E", "Z"];

export const MountCheckBox = (props: Props) => {
  const { isChecked, addMount, removeMount } = useQueryParamsForMount();
  return (
    <div className={"flex gap-x-4"}>
      {MASTER_MOUNTS.map((mount) => (
        <label
          className={"flex cursor-pointer items-center gap-x-1"}
          key={mount}
        >
          <input
            type="checkbox"
            checked={isChecked(mount)}
            onChange={(e) => {
              if (e.target.checked) {
                addMount(mount);
              } else {
                removeMount(mount);
              }
            }}
          />
          <span className={"font-bold"}>{mount}</span>
        </label>
      ))}
    </div>
  );
};

const useQueryParamsForMount = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isChecked = (mount: string) => {
    return searchParams.getAll("mount").includes(mount);
  };

  const addMount = (mount: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.append("mount", mount);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const removeMount = (mount: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentMounts = searchParams.getAll("mount");
    newParams.delete("mount");
    currentMounts
      .filter((m) => m !== mount)
      .forEach((m) => newParams.append("mount", m));
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return { isChecked, addMount, removeMount };
};
