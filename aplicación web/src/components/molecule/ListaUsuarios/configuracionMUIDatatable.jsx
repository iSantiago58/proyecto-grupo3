function definirOpciones() {

  const opciones = {
    selectableRows: "none",
    download: false, // boton para generar csv
    print: false, // boton para generar pdf
    viewColumns: false, // Boton para ocultar columnas
    filter: true, // habilita el boton de filtro
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se han encontrado resultados.",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por: ${column.label}`,
      },
      pagination: {
        next: "Siguiente pagina",
        previous: "Anterior pagina",
        rowsPerPage: "Filas por pagina:",
        displayRows: "de",
      },
    },
    setRowProps: (row, dataIndex, rowIndex) => {

      // let estado = row[row.length - 3];
      // let alias = row[0];
      // let rol = row[row.length - 2];
      // row[row.length - 1] = botoneraEstados(estado,alias);
      // row[row.length - 2] = roles[rol];
      // row[row.length - 3] = iconoEstados(estado);
      // row[1] = emails(row[1]);
    },
  };
  return opciones;
}

export { definirOpciones };
