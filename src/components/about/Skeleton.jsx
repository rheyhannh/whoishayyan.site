import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/app/_root.module.css'

export default function AboutSkeleton({ part }) {
    if (part === 'data') {
        return (
            <>
                <p className={styles.about__description}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'100%'} count={5} style={{ marginBottom: 'var(--mb-0-5)' }} />
                    </SkeletonTheme>
                </p>

                <div className={styles.about__info}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'60%'} containerClassName={styles.about__info_skeleton} count={1} />
                    </SkeletonTheme>

                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'80%'} containerClassName={styles.about__info_skeleton} count={1} />
                    </SkeletonTheme>
                </div>

                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'50%'} height={'40px'} containerClassName={styles.about__buttons} count={1} />
                </SkeletonTheme>
            </>
        )
    }
    else if (part === 'image') {
        return (
            <div>
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton className={styles.about__img_skeleton} count={1} />
                </SkeletonTheme>
            </div>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}