import { MUIDataTableStyled } from "./style";

import { definirOpciones } from "./configuracionMUIDatatable";

const ListaUsuarios = ({ datos }) => {
  //  definimos columnas
  const columns = [
    { name: "alias", label: "Alias",
      options: {
        filter: false
      }
    },
    {
      name: "email",
      label: "Correo Electronico",
      options: {
        filter: false
      }

    },

    { name: "name", label: "Nombre",      
      options: {
        filter: false,
      } 
    },
    { name: "lastName", label: "Apellido",      
      options: {
        filter: false,
      }  
    },
    { name: "phone", label: "Teléfono",      
      options: {
        filter: false,
      }  
    },
    { name: "creationDate", label: "Fecha de alta",      
      options: {
        filter: false,
      }  
    },
    { name: "iconStatus", label: "Estado",
      options: {
        filter: true,
        filterType: 'checkbox',
        filterOptions: {
          names: ["BLOQUEADO","ELIMINADO","ESPERANDO","ACEPTADO"],
          logic(iconStatus, filterVal) {
      
            let strIconStatus = ""+iconStatus+"";
            const show =
              (filterVal.indexOf('BLOQUEADO') >= 0 && strIconStatus.search("d55a34") != -1) ||
              (filterVal.indexOf('ELIMINADO') >= 0 && strIconStatus.search("e53c41") != -1) ||
              (filterVal.indexOf('ESPERANDO') >= 0 && strIconStatus.search("ecab40") != -1) ||
              (filterVal.indexOf('ACEPTADO') >= 0 && strIconStatus.search("33b047") != -1);
            return !show;
          },
        },
        sort: false,
      },
      
    },
    { name: "role", label: "Rol" },
    {
      name: "Action",
      options: {
        filter: false,
      }
    },
  ];

  return (
    <MUIDataTableStyled
      title={"Lista Usuarios"}
      data={datos}
      columns={columns}
      options={definirOpciones()}
    />
  );
};




export { ListaUsuarios };
