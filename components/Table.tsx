import { TableStyles } from "./styles/styles";

interface TableProps {
  children: React.ReactNode;
  className?: string;
  columnHeads: string[];
}

const Table = ({ children, className, columnHeads }: TableProps) => {
  return (
    <div className={TableStyles.table.main}>
      <div className={TableStyles.table.sub}>
        <div className={TableStyles.table.box}>
          <div className={TableStyles.table.parent}>
            <table className={`${className} ${TableStyles.table.table}`}>
              <thead className={TableStyles.thead.thead}>
                <tr>
                  {columnHeads?.length > 0 &&
                    columnHeads?.map((col, index) => (
                      <th
                        scope="col"
                        key={index + 1}
                        className={`${index === 0 && "rounded-l-md"} ${
                          index === columnHeads?.length - 1 && "rounded-r-md"
                        } ${TableStyles.thead.theadrow}`}
                      >
                        {col}
                      </th>
                    ))}
                </tr>
              </thead>
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TableChildProps {
  children: React.ReactNode;
  className?: string;
}

const TableBody = ({ children, className }: TableChildProps) => {
  return (
    <tbody className={className}>
      <tr>{children}</tr>
    </tbody>
  );
};

const TableRow = ({ children, className }: TableChildProps) => {
  return <td className={`${className} ${TableStyles.tbodyrow}`}>{children}</td>;
};

Table.Body = TableBody;
Table.Row = TableRow;

export default Table;