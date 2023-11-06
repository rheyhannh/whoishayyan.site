import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/app/_root.module.css'

const DataSkeleton = () => {
    return (
        <>
            <div>
                <div className={styles.contact__information}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'100%'} height={'100%'} containerClassName={`${styles.contact__icon} ${styles.skeleton}`} />
                    </SkeletonTheme>

                    <div style={{ width: '100%' }}>
                        <h3 className={styles.contact__title}>
                            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                                <Skeleton width={'40%'} />
                            </SkeletonTheme>
                        </h3>
                        <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                            <Skeleton width={'60%'} containerClassName={styles.contact__subtitle} />
                        </SkeletonTheme>
                    </div>
                </div>

                <div className={styles.contact__information}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'100%'} height={'100%'} containerClassName={`${styles.contact__icon} ${styles.skeleton}`} />
                    </SkeletonTheme>

                    <div style={{ width: '100%' }}>
                        <h3 className={styles.contact__title}>
                            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                                <Skeleton width={'40%'} />
                            </SkeletonTheme>
                        </h3>
                        <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                            <Skeleton width={'80%'} containerClassName={styles.contact__subtitle} />
                        </SkeletonTheme>
                    </div>
                </div>

                <div className={styles.contact__information}>
                    <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                        <Skeleton width={'100%'} height={'100%'} containerClassName={`${styles.contact__icon} ${styles.skeleton}`} />
                    </SkeletonTheme>

                    <div style={{ width: '100%' }}>
                        <h3 className={styles.contact__title}>
                            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                                <Skeleton width={'40%'} />
                            </SkeletonTheme>
                        </h3>
                        <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                            <Skeleton width={'70%'} containerClassName={styles.contact__subtitle} />
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
        </>
    )
}

const FormSkeleton = () => {
    return (
        <form className={`${styles.contact__form} ${styles.grid}`}>
            <div className={`${styles.contact__inputs} ${styles.grid}`}>

                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'100%'} className={`${styles.contact__content} ${styles.skeleton}`} />
                </SkeletonTheme>

                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton width={'100%'} className={`${styles.contact__content} ${styles.skeleton}`} />
                </SkeletonTheme>

            </div>

            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                <Skeleton width={'100%'} className={`${styles.contact__content} ${styles.textarea_skeleton}`} />
            </SkeletonTheme>

            <div>
                <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                    <Skeleton
                        height={'50px'}
                        className={styles.contact__button_skeleton}
                    />
                </SkeletonTheme>
            </div>

        </form>
    )
}

export default function ContactSkeleton() {
    return (
        <>
            {DataSkeleton()}
            {FormSkeleton()}
        </>
    )
}