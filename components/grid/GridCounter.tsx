"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type Counts = Record<string, number>;

type GridCounterValue = {
    report: (key: string, count: number) => void;
    counts: Counts;
};

const GridCounterContext = createContext<GridCounterValue | null>(null);

const keyOf = (column: string, order: number) => `${column}:${order}`;

/**
 * Keeps the square count of every grid so each one knows how many squares came
 * before it in its column, and the numbering keeps going instead of restarting
 * at every section.
 */
export const GridCounterProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [counts, setCounts] = useState<Counts>({});

    const report = useCallback((key: string, count: number) => {
        setCounts((prev) =>
            prev[key] === count ? prev : { ...prev, [key]: count },
        );
    }, []);

    const value = useMemo(() => ({ report, counts }), [report, counts]);

    return (
        <GridCounterContext.Provider value={value}>
            {children}
        </GridCounterContext.Provider>
    );
};

/**
 * Reports this grid's square count and returns how many squares the grids above
 * it already used, i.e. the number its first square should continue from.
 */
export const useGridOffset = (column: string, order: number, count: number) => {
    const context = useContext(GridCounterContext);
    const report = context?.report;

    useEffect(() => {
        report?.(keyOf(column, order), count);
    }, [report, column, order, count]);

    if (!context) return 0;

    let offset = 0;
    for (let i = 0; i < order; i++) {
        offset += context.counts[keyOf(column, i)] ?? 0;
    }

    return offset;
};
