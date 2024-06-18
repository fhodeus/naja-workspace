import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './titled-section.module.scss';

const style = createStyleHelper(styles, 'titled-section');

export interface ITitledSectionProps {
    className?: string;
    title: string | JSX.Element;
    description?: string | JSX.Element;
    contentClassName?: string;
    scrollable?: boolean;
}

export const TitledSection: FCWithChildren<ITitledSectionProps> = ({
    className,
    title,
    description,
    contentClassName,
    scrollable = false,
    children,
}) => {
    return (
        <section className={createClassName([className, style()])}>
            <h2 className={style('title', { description: !!description })}>{title}</h2>
            {description ? <div className={style('description')}>{description}</div> : null}
            <div className={createClassName([style('content', { scrollable }), contentClassName])}>
                {children}
            </div>
        </section>
    );
};
