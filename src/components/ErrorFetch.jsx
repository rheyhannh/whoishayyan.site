import styles from '@/app/_root.module.css'

export default function ErrorFetch({ clickEvent, type }) {
    return (
        <div className={styles.error__fetch}>
            <div
                tabIndex={'0'}
                className={styles.error__fetch_msg}
                onClick={clickEvent}
                onKeyDown={(e) => { if (e.key === 'Enter') clickEvent(); }}
            >
                <h3>Could not load {type ? type + ' data' : 'data'}</h3>
                <p>Click to Retry &#x21bb;</p>
            </div>
        </div>
    )
}