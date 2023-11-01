import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/app/_root.module.css'

export default function ProjectSkeleton() {
    return (
        <>
            <div className={`${styles.portfolio__container} ${styles.container}`}>
                <div className={`${styles.portfolio__content} ${styles.grid}`}>

                    <div className={`${styles.portfolio__img} ${styles.skeleton}`}>
                        <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                            <Skeleton width={'100%'} height={'100%'} count={1} />
                        </SkeletonTheme>
                    </div>

                    <div className={styles.portfolio__data}>
                        <h3 className={styles.portfolio__title}>
                            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                                <Skeleton width={'60%'} height={'100%'} count={1} style={{ marginBottom: 'var(--mb-0-25)' }} />
                            </SkeletonTheme>
                        </h3>

                        <p className={`${styles.portfolio__description} ${styles.text__justify}`}>
                            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                                <Skeleton width={'100%'} height={'100%'} count={3} style={{ marginBottom: 'var(--mb-0-25)' }} />
                            </SkeletonTheme>
                        </p>

                        <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                            <Skeleton width={'40%'} height={'40px'} count={1} style={{ marginBottom: 'var(--mb-0-25)' }} />
                        </SkeletonTheme>

                    </div>
                </div>
            </div>

        </>
    )
}