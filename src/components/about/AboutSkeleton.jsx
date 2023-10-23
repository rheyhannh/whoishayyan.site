import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/app/_root.module.css'

export default function AboutSkeleton() {
    return (
        <>
            <p className={styles.about__description}>
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'100%'} count={5} />
                </SkeletonTheme>
            </p>

            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                <Skeleton width={'80%'} count={1} containerClassName={styles.about__info} />
            </SkeletonTheme>                  

            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'50%'} height={'40px'} count={1} />
            </SkeletonTheme>
        </>
    )
}