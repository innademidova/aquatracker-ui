import { FC, PropsWithChildren } from "react";

interface RightSectionProps {
    className?: string;
}

const RightSection: FC<PropsWithChildren<RightSectionProps>> = ({ className, children }) => {
    return <div className={className}>{children}</div>
}

export default RightSection;