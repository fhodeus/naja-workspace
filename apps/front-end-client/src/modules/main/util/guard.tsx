import type { PropsWithChildren, ReactElement } from 'react';
import { cloneElement } from 'react';
import { Outlet } from 'react-router-dom';

export function Guard(props: PropsWithChildren<{ guards: ReactElement[] }>) {
    const { guards, children: init } = props;
    return (
        <>
            {guards.reduceRight(
                (current, guard) => cloneElement(guard, { children: current }),
                init ? init : <Outlet />,
            )}
        </>
    );
}
