import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type LensCategory = "having" | "want" | "selling";

export const useQueryParamsForLens = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isChecked = (lensId: string, type: LensCategory) => {
    return searchParams.getAll(type).includes(lensId);
  };
  const addLens = (lensId: string, type: LensCategory) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.append(type, lensId);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };
  const removeLens = (lensId: string, type: LensCategory) => {
    const newParams = new URLSearchParams(searchParams.toString());
    // paramsから、そのlensIdのみを削除します
    const currentLensIds = searchParams.getAll(type);
    newParams.delete(type);
    currentLensIds
      .filter((id) => id !== lensId)
      .forEach((id) => newParams.append(type, id));
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return { isChecked, addLens, removeLens };
};
