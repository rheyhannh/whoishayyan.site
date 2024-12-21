import { useEffect, useState } from 'react';
import getUniconsIcons from '@/utils/getUniconIcons';
import Button from '@/components/Button';
import styles from '@/app/_root.module.css'

/**
 * Component props for {@link ContactData}
 * @typedef {Object} ContactDataProps
 * @property {import('@/schema/page/root').contactSectionDataType} data
 * Section data
 */

/**
 * Component that represent section `Contact` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {ContactDataProps} props ContactData props
 * @returns {React.ReactElement<ContactDataProps, HTMLDivElement>} Rendered component
 */
export default function ContactData({ data }) {
    const [icons, setIcons] = useState(/** @type {Array<JSX.Element>} */([]));
    const [otherIcons, setOtherIcons] = useState(null);

    useEffect(() => {
        const loadIcons = async () => {
            const icons = await Promise.all(
                data.content.map(async (item) => {
                    const icon = await getUniconsIcons(item.uil, item?.className ? styles[item.className] : null);
                    return icon;
                })
            );

            const otherIcons = await getUniconsIcons(data.button.uil, styles.button__icon);

            setIcons(icons);
            setOtherIcons(otherIcons);
        };

        loadIcons();
    }, [data])

    return (
        <>
            <div>
                {data.content.map((item, index) => (
                    <div className={styles.contact__information} key={index}>
                        <div className={styles.contact__icon}>
                            {icons[index]}
                        </div>

                        <div>
                            <h3 className={styles.contact__title}>{item.title}</h3>
                            <span className={styles.contact__subtitle}>{item.text}</span>
                        </div>
                    </div>
                ))}
            </div>

            <form className={`${styles.contact__form} ${styles.grid}`}>
                <div className={`${styles.contact__inputs} ${styles.grid}`}>
                    <div className={styles.contact__content}>
                        <label htmlFor='name' className={styles.contact__label}>Name</label>
                        <input type={'text'} className={styles.contact__input} name='name' id='name' autoComplete='off' />
                    </div>
                    <div className={styles.contact__content}>
                        <label htmlFor='email' className={styles.contact__label}>Email</label>
                        <input type={'email'} className={styles.contact__input} name='email' id='email' autoComplete='off' />
                    </div>
                </div>
                <div className={styles.contact__content}>
                    <label htmlFor='message' className={styles.contact__label}>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        autoComplete='off'
                        cols="0"
                        rows="5"
                        className={styles.contact__input}
                    >

                    </textarea>
                </div>

                <div>
                    <a className={`${styles.button} ${styles.button__flex} ${styles.contact__button}`} id="submitMessageBtn">
                        {data.button.text} {otherIcons}
                    </a>
                </div>
            </form>
        </>
    )
}