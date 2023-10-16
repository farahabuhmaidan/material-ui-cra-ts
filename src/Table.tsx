import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from '@mui/material';
  import { fetchTypesForPokemon } from './pokeapi'; 
 
interface Column {
  id: 'name' | 'type' | 'weight';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 50, align: 'center', },
//   { id: 'habitat', label: 'Habitat', minWidth: 100 },
  {
    id: 'type',
    label: 'Type',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'weight',
    label: 'Weight (kg))',
    minWidth: 50,
    align: 'center',
  },
];

interface Data {
  name: string;
//   habitat?: string;
  type: string;
  weight: number;
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]); 

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonURLs = data.results.map((pokemon: { url: string }) => pokemon.url);
        const fetchPokemonDetails = async () => {
          const pokemonData = await Promise.all(
            pokemonURLs.map(async (url:string) => {
              const response = await fetch(url);
              const pokemonDetails = await response.json();
            //   const habitatData = await fetchPokemonHabitat(url); 
              const types = await fetchTypesForPokemon(url);
              return {
                name: pokemonDetails.name,
                // habitat: habitatData.name,
                type: types.join(', '),
                weight: pokemonDetails.weight,
              };
            })
          );
          setRows(pokemonData);
        };

        fetchPokemonDetails();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: 1000, overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
