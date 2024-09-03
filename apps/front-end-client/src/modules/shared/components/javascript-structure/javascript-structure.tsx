import { Accordion } from '@endeavour/ui-kit';

import { useAppSelector } from '../../../main/store/root.store';
import { selectViewStructure } from '../../store/layout.store';
import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './javascript-structure.module.scss';

const style = createStyleHelper(styles, 'javascript-structure');

export function JavascriptStructure({ data, className }: { data: object; className?: string }) {
    const viewStructureEnabled = useAppSelector(selectViewStructure);

    return (
        <Accordion isOpen={viewStructureEnabled}>
            <pre className={createClassName([className, style()])}>
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        </Accordion>
    );
}
