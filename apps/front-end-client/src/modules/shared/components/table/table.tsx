import { createStyleHelper } from '../../../shared/utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './table.module.scss';

const style = createStyleHelper(styles, 'table-wrapper');

export interface ITableProps {
    tHeadList: [string | JSX.Element];
}

export const Table: FCWithChildren<ITableProps> = ({ tHeadList, children }) => {
    return (
        <div className={style()}>
            <table className={style('table')}>
                <thead>
                    <tr className={style('row')}>
                        {tHeadList.map((item, index) => (
                            <th
                                className={style('heading')}
                                key={typeof item !== 'string' ? `table-list-${index}` : item}
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
};
