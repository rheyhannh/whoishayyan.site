const getUniconsIcons = async (iconName, className) => {
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