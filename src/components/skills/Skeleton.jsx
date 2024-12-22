import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/app/_root.module.css";

export default function SkillsSkeleton() {
    return (
        <>
            <div className={`${styles.skills__list} ${styles.swiper} ${styles.skeleton}`}>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
                <div className={`${styles.skills__box} ${styles.skeleton}`}></div>
            </div>

            <div className={`${styles.skills__about} ${styles.skeleton}`}>
                <h3>
                    <SkeletonTheme
                        baseColor="var(--skeleton-base)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        <Skeleton width={"30%"} height={"100%"} count={1} />
                    </SkeletonTheme>
                </h3>

                <p>
                    <SkeletonTheme
                        baseColor="var(--skeleton-base)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        <Skeleton width={"100%"} height={"100%"} style={{ marginBottom: 'var(--mb-0-5)' }} count={3} />
                    </SkeletonTheme>
                </p>
            </div>
        </>
    )
}