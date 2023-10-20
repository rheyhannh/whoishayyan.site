import styles from './main.module.css'

const LoaderPage = () => {
    return (
        <div className={styles.loader}>
            <span className={styles.loading}></span>
        </div>
    )
}

export default LoaderPage;