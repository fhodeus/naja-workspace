import type { FunctionComponent } from 'react';
import { useCallback, useState } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './icon-hover.module.scss';

const style = createStyleHelper(styles, 'icon-hover');

export interface IIconHoverProps {
    className?: string;
    hoverItem: JSX.Element | string;
    infoDisplay: JSX.Element | string;
    openToTheLeft?: boolean;
}

export const IconHover: FunctionComponent<IIconHoverProps> = ({
    className,
    hoverItem,
    infoDisplay,
    openToTheLeft = false,
}) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        setIsHovering(false);
    }, []);

    return (
        <div className={createClassName([className, style()])}>
            <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                {hoverItem}
            </div>
            {isHovering && (
                <div className={style('info-hover', { 'open-left': openToTheLeft })}>
                    {infoDisplay}
                </div>
            )}
        </div>
    );
};
