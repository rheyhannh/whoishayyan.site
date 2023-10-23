import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/app/_root.module.css'

export default function HomeSkeleton() {
    return (
        <> 
            <h1 className={styles.home__title}>
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'100%'} count={1} />
                </SkeletonTheme>                    
            </h1>

            <h3 className={styles.home__subtitle}>
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'70%'} count={1} />
                </SkeletonTheme>
            </h3>

            <p className={styles.home__description}>
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'90%'} count={3} />
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