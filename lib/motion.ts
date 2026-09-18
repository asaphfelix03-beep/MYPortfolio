/**
 * Detection margin for everything that animates in as it scrolls into view.
 *
 * Vertical only, on purpose. A bare "-60px" shrinks the detection box on all
 * four sides: on a 390px phone that leaves only 60–330px of width, and any
 * narrow element near an edge never counts as visible. That is what kept the
 * certification counter at 0 (right-aligned in its card) and the formation
 * timeline without its line or dots (left edge) on mobile, while desktop,
 * with room to spare, looked fine.
 *
 * Every reveal reads this one value so none can drift back to the shorthand.
 */
export const IN_VIEW_MARGIN = "-60px 0px" as const;
