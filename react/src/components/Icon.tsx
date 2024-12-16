import { FC, ImgHTMLAttributes, useEffect, useState } from "react";
import { IconType } from "../types/IconType";

type IconSize = "small" | "medium" | "large";

const icons = import.meta.glob("../icons/*.svg", { query: "url", import: "default" });

const sizeMap: Record<IconSize, string> = {
    small: "1rem",
    medium: "1.5rem",
    large: "2rem",
};

type IconProps = {
    name: IconType;
    size?: IconSize | string;
    alt?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Icon: FC<IconProps> = (props) => {
    const { name, size = "medium", alt, className, style, ...rest } = props;

    const [iconPath, setIconPath] = useState<string | null>(null);

    const iconKey = `../icons/${name}.svg`;

    useEffect(() => {
        if (icons[iconKey]) {
            icons[iconKey]().then((resolvedPath) => {
                setIconPath(resolvedPath as string);
            }).catch(() => {
                console.error(`Failed to load icon: "${name}".`);
            });
        } else {
            console.error(`Icon "${name}" not found. Available icons:`, Object.keys(icons));
            setIconPath(null);
        }
    }, [name]);

    if (!iconPath) {
        return <span>{name}</span>; // Fallback if the icon isn't available or is still loading
    }

    const computedSize = size in sizeMap ? sizeMap[size as IconSize] : size;

    return (
        <img
            src={iconPath}
            alt={alt || name}
            loading="lazy"
            className={className || ""}
            style={{
                width: computedSize,
                height: computedSize,
                ...style,
            }}
            {...rest}
        />
    );
};
