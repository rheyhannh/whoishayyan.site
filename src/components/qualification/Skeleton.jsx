import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/app/_root.module.css";

export default function QualificationSkeleton({ part }) {
    if (part === "tabs") {
        return (
            <>
                <div
                    style={{
                        width: 150,
                        height: 30,
                        margin: "0 var(--mb-1)"
                    }}
                >
                    <SkeletonTheme
                        baseColor="var(--skeleton-base)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        <Skeleton width={"100%"} height={"100%"} count={1} />
                    </SkeletonTheme>
                </div>

                <div
                    style={{
                        width: 150,
                        height: 30,
                        margin: "0 var(--mb-1)"
                    }}
                >
                    <SkeletonTheme
                        baseColor="var(--skeleton-base)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        <Skeleton width={"100%"} height={"100%"} count={1} />
                    </SkeletonTheme>
                </div>
            </>
        );
    } else if (part === "content") {
        return (
            <>
                <div className={styles.qualification__active} tabsdata={'true'}>
                    <div className={styles.qualification__data}>
                        <div>
                            <SkeletonTheme
                                baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)"
                            >
                                <Skeleton style={{marginBottom: 'var(--mb-0-5)'}} width={"80%"} count={1} className={styles.qualification__title} />
                            </SkeletonTheme>

                            <SkeletonTheme
                                baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)"
                            >
                                <Skeleton width={"90%"} count={1} className={styles.qualification__subtitle} />
                            </SkeletonTheme>

                            <SkeletonTheme
                                baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)"
                            >
                                <Skeleton width={"70%"} count={1} className={styles.qualification__calendar} />
                            </SkeletonTheme>
                        </div>
                        <div>
                            <span className={styles.qualification__rounder}></span>
                            <span className={styles.qualification__line}></span>
                        </div>
                        <div></div>
                    </div>

                    <div className={styles.qualification__data}>
                        <div></div>

                        <div>
                            <span className={styles.qualification__rounder}></span>
                            <span className={styles.qualification__line}></span>
                        </div>

                        <div>
                            <h3 className={styles.qualification__title}>
                                <SkeletonTheme
                                    baseColor="var(--skeleton-base)"
                                    highlightColor="var(--skeleton-highlight)"
                                >
                                    <Skeleton style={{marginBottom: 'var(--mb-0-5)'}} width={"80%"} count={1} />
                                </SkeletonTheme>
                            </h3>

                            <SkeletonTheme
                                baseColor="var(--skeleton-base)"
                                highlightColor="var(--skeleton-highlight)"
                            >
                                <Skeleton width={"90%"} count={1} className={styles.qualification__subtitle} />
                            </SkeletonTheme>

                            <div className={styles.qualification__calendar}>
                                <SkeletonTheme
                                    baseColor="var(--skeleton-base)"
                                    highlightColor="var(--skeleton-highlight)"
                                >
                                    <Skeleton width={"70%"} count={1} />
                                </SkeletonTheme>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
