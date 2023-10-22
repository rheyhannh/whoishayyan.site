import Link from "next/link";

export default function Button({ href = "", target = "_self", className = "", text = "", icon = ""}) {
    return (
        <Link
            href={href}
            target={target}
            className={className}
        >
            {text} {icon}
        </Link>
    )
}