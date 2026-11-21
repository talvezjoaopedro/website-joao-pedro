"use client";

import Image from "next/image";
import styles from "./Grid.module.scss";
import { useEffect, useRef, useState } from "react";
import { useGridOffset } from "./GridCounter";

/**
 * Size of a square, in px. Single source of truth: the SCSS reads it from the
 * custom property and the count below divides by it. Counting with a different
 * value than the squares actually measure makes the count drift from what is on
 * screen, which skips numbers at every section boundary.
 */
export const SQUARE_SIZE = 80;

type Props = {
    direction: "ltr" | "rtl";
    /** Position of this grid inside its column, top to bottom. */
    order?: number;
};

const Grid = ({ direction, order = 0 }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [squareCount, setSquareCount] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const measure = () => {
            const { height } = element.getBoundingClientRect();
            // Round instead of ceil: a square only makes the cut if at least
            // half of it fits, so its number is always visible. A square
            // clipped out of the section would spend a number nobody sees.
            setSquareCount(Math.max(0, Math.round(height / SQUARE_SIZE)));
        };

        // ResizeObserver rather than window.resize: the section also changes
        // height on content reflow (fonts, images) with no window resize.
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        measure();

        return () => observer.disconnect();
    }, []);

    const offset = useGridOffset(direction, order, squareCount);

    return (
        <div
            ref={ref}
            style={
                {
                    "--grid-square-size": `${SQUARE_SIZE}px`,
                } as React.CSSProperties
            }
            className={`
                ${styles.grid}
                ${direction === "rtl" ? styles.rtl : styles.ltr}
            `}
        >
            {[...Array(squareCount)].map((_, i) => (
                <div
                    key={i}
                    className={`
                    ${styles.gridSquare}
                    ${direction === "rtl" ? styles.rtl : styles.ltr}
                `}
                >
                    <div className={styles.gridNumber}>{offset + i + 1}</div>
                    <Image
                        height={66}
                        width={20}
                        src="dash-border.svg"
                        alt="dashed border"
                        className={styles.gridBorder}
                    ></Image>
                </div>
            ))}
        </div>
    );
};

export default Grid;
