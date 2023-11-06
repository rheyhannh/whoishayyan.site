import Link from "next/link";

export default function Button({ href = "", target = "_self", className = "", text = "", icon = "", label}) {
    return (
        <Link
            href={href}
            target={target}
            className={className ? className : ''}
            aria-label={label ? label : 'My Label'}
        >
            {text} {icon}
        </Link>
    )
}