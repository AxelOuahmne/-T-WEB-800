import axios from "axios";

export const getPlacesData = async (type,sw,ne) => {

    try {
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
        },headers:{
          'X-RapidAPI-Key': '8f8c402b75msh5fb74efc8ab705ap1c08a9jsnee12aa66a93a',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }});
      
       return data;
    } catch (error) {
        console.log(error.message);

    }
};

// import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://yahoo-weather5.p.rapidapi.com/weather',
//   params: {
//     lat: '37.372',
//     long: '-122.038',
//     format: 'json',
//     u: 'f'
//   },
//   headers: {
//     'X-RapidAPI-Key': '8f8c402b75msh5fb74efc8ab705ap1c08a9jsnee12aa66a93a',
//     'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
//}
// //
// 

// export  const getWeatherData = async(lat,long)=>{
//   // try {
//   //   const {data} = await axios.gat('hhttps://yahoo-weather5.p.rapidapi.com/weather', {
//   //     params: {
//   //           lat: lat,
//   //           long: long,
//   //           // format: 'json',
//   //           // u: 'f'
//   //         },
//   //     headers: {
//   //       'X-RapidAPI-Key': '8f8c402b75msh5fb74efc8ab705ap1c08a9jsnee12aa66a93a',
//   //       'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
//   //     }
//   //   })
//   //   return data;
//   // } catch (error) {
//   //   console.error(error);
//   // }
// }