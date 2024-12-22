import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/app/_root.module.css'

export default function HomeSkeleton({ part, loadingClick }) {
    if (part === 'data') {
        return (
            <>
                <h1 className={styles.home__title}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'90%'} count={1} />
                    </SkeletonTheme>
                </h1>

                <h3 className={styles.home__subtitle}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'70%'} count={1} />
                    </SkeletonTheme>
                </h3>

                <p className={styles.home__description}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton style={{marginBottom: 'var(--mb-0-5)'}} width={'100%'} count={3} />
                    </SkeletonTheme>
                </p>

                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'50%'} height={'40px'} count={1} />
                </SkeletonTheme>

                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'40%'} count={1} containerClassName={styles.home__scroll} />
                </SkeletonTheme>
            </>
        )
    }
    else if (part === 'blob') {
        return (
            <div onClick={loadingClick} >
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'100%'} height={'100%'} containerClassName={`${styles.home__blob} ${styles.skeleton}`} count={1} />
                </SkeletonTheme>
            </div>
        )
    }
    else if (part === 'social') {
        return (
            <>
                <div className={`${styles.social__box} ${styles.skeleton} ${styles.circle1}`}></div>
                <div className={`${styles.social__box} ${styles.skeleton} ${styles.circle2}`}></div>
                <div className={`${styles.social__box} ${styles.skeleton} ${styles.circle3}`}></div>
            </>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}