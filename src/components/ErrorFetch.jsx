import styles from '@/app/_root.module.css'

export default function ErrorFetch({ clickEvent, type }) {
    return (
        <div className={styles.error__fetch}>
            <div className={styles.error__fetch_msg} onClick={clickEvent}>
                <h3>Gagal mengambil {type ? type + ' data' : 'data'}</h3>
                <p>Muat Ulang &#x21bb;</p>
            </div>
        </div>        
    )
}