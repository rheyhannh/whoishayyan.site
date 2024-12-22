/**
 * Dynamically imports a specified Unicons icon component and renders it with a provided class name.
 *
 * @async
 * @param {string} iconName Icon name in  `react-unicons`
 * @param {string} className The CSS class name to apply
 * @returns {Promise<JSX.Element|null>} A promise that resolves rendered icon component if the icon is found, or `null` if the icon does not exist
 */
const getUniconsIcons = async (iconName, className) => {
    if (!iconName) return null;

    const iconsModule = await import('@iconscout/react-unicons');
    if (iconName in iconsModule) {
        const Icon = iconsModule[iconName];

        return (
            <Icon className={className} />
        );
    } else {
        return null;
    }
}

export default getUniconsIcons;