import { useContext } from "react"
import { ModalContext } from "@/components/provider/Modal"
import { RootPageContext } from "@/components/provider/RootPage";
import {
    UilTimes
} from '@iconscout/react-unicons'
import styles from './modal.module.css'

/**
 * Component Description
 * @returns {JSX.Element} Rendered component
 */
export default function ModalSetting() {
    const { active, handleModalClose } = useContext(ModalContext);
    const { forceLoadingState, forceErrorState, setForceLoadingState, setForceErrorState } = useContext(RootPageContext);

    return (
        <div className={`${styles.overlay} ${active ? styles.active : ''}`}>
            <div className={styles.setting}>
                <h2 className={styles.heading}>
                    <span>Setting</span>
                    <span
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => { handleModalClose() }}>
                        <UilTimes />
                    </span>
                </h2>
                <div className={styles.layout}>
                    <span className={styles.small}>Page State</span>

                    <div
                        className={`${styles.panel} ${!forceErrorState && !forceLoadingState ? styles.active : ''}`}
                        onClick={() => { setForceLoadingState(false); setForceErrorState(false); }}
                    >
                        <span className={styles.title}>Default</span>
                        <span className={styles.small}>
                            Normal view
                        </span>
                    </div>

                    <div
                        className={`${styles.panel} ${forceLoadingState ? styles.active : ''}`}
                        onClick={() => { setForceLoadingState(true); setForceErrorState(false); }}
                    >
                        <span className={styles.title}>Loading</span>
                        <span className={styles.small}>
                            Simulate the view during loading
                        </span>
                    </div>

                    <div
                        className={`${styles.panel} ${forceErrorState ? styles.active : ''}`}
                        onClick={() => { setForceErrorState(true); setForceLoadingState(false); }}
                    >
                        <span className={styles.title}>Error</span>
                        <span className={styles.small}>
                            Simulate the view during error
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}