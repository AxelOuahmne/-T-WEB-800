import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

export default function ComboBox({ dis, setDis }) {
  const [airports, setAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState(dis);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(dis);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [dis]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/airport?term=${searchTerm}`);
        setAirports(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des aéroports', error);
      }
    };

    if (searchTerm !== '') {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={airports.map((airport) => ({ 
        label: `${airport.address.cityName} (${airport.iataCode})`, 
        value: airport.iataCode,
        countryCode: airport.address.countryCode,
        key: airport.id // Utilisation de l'index comme clé unique
      }))}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Aéroport" onChange={(event) => setDis(event.target.value)} />}
      renderOption={(props, option) => (
        <li key={option.value}  {...props}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`https://flagsapi.com/${option.countryCode}/flat/64.png`} alt={`Flag of ${option.countryCode}`} style={{ width: 24, marginRight: 8 }} />
            <span>{option.label}</span>
          </div>
        </li>
      )}
    />
  );
}































// import React, { useEffect, useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import axios from 'axios';

// export default function ComboBox({ dis, setDis }) {
//   const [airports, setAirports] = useState([]);

//   useEffect(() => {
//     console.log("dis",dis)
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/airport?term=${dis}`);
//         setAirports(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des aéroports', error);
//       }
//     };

//     fetchData();
//   }, [dis]);

//   return (
//     <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={airports.map((airport) => ({ 
//         label: `${airport.address.cityName} (${airport.iataCode})`, 
//         value: airport.iataCode,
//         countryCode: airport.address.countryCode // Ajout de countryCode à l'option
//       }))}
//       sx={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Aéroport" onChange={(event) => setDis(event.target.value)} />}
//       renderOption={(props, option) => (
//         <li key={option.value}  {...props}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <img src={`https://flagsapi.com/${option.countryCode}/flat/64.png`} alt={`Flag of ${option.countryCode}`} style={{ width: 24, marginRight: 8 }} />
//             <span>{option.label}</span>
//           </div>
//         </li>
//       )}
//     />
//   );
// }



