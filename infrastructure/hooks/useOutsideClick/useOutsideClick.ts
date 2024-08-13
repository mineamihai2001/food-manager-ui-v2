import { Ref, useEffect } from "react";

export function useOutsideClick<T extends any, D extends any>(
    callback: () => void,
    refs: Ref<T>[],
    ignoreRefs: Ref<D>[] = []
) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            for (const ref of refs) {
                if (
                    ref &&
                    "current" in ref &&
                    ref.current &&
                    !(ref.current as any).contains(e.target as Node) &&
                    ignoreRefs.find(
                        (r: Ref<D>): boolean =>
                            r !== null &&
                            "current" in r &&
                            r.current !== null &&
                            !(r.current! as any).contains(e.target as Node)
                    )
                ) {
                    callback();
                    break;
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [...refs]);
}
