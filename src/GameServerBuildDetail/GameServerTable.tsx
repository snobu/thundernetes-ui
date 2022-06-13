import { useState } from "react";
import GameServerTableItem from "./GameServerTableItem";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { GameServer } from "../types";
import TablePaginationActions from "../Common/TablePaginationActions";

interface GameServerTableProps {
  gsList: Array<GameServer>,
  gsdByName: Record<string, Record<string, number>>
}

function GameServerTable({ gsList, gsdByName }: GameServerTableProps) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gsList.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  gsList = gsList.sort((a: GameServer, b: GameServer) => a.metadata.name > b.metadata.name ? 1 : (a.metadata.name < b.metadata.name ? -1 : 0));
  let items = gsList.map((gs, index) => <GameServerTableItem key={index} gs={gs} gsd={gsdByName[gs.metadata.name]} />);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Namespace</TableCell>
            <TableCell>Health</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Public IP</TableCell>
            <TableCell>Ports</TableCell>
            <TableCell>Player Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : items
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              colSpan={7}
              count={gsList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default GameServerTable;