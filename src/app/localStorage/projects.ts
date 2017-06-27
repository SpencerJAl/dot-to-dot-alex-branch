/**
 * Created by James on 22/05/2017.
 */
export class GetProjects{
  load(){
    if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){
      console.log('No markers found....creating...');

      var markers = [
        {
          name:'Company One',
          lat: 42.825588,
          lng: -71.018029,
          draggable: true,
          people:[{name:"James"},{name:"Jack"}],
          messages:[{
            displayName:"James",
            email:"JamesScott96@live.co.uk",
            message:"g",
            timestamp:149541808471
          },
            {
              displayName:"James",
              email:"JamesScott96@live.co.uk",
              message:"testing",
              timestamp:149541808471
            }],
          type:"cookings"
        },
        {
          name: 'Company Two',
          lat: 42.868164,
          lng: -70.889071,
          draggable: true,
          people:[{name:"Catriona"},{name:"Jack"}],
          messages:[{
            displayName:"James",
            email:"JamesScott96@live.co.uk",
            message:"dasdsd",
            timestamp:149541808471
          },
            {
              displayName:"James",
              email:"JamesScott96@live.co.uk",
              message:"wdwdwd",
              timestamp:149541808471
            }],
          type:"gamings"
        },
        {
          name: 'Company Three',
          lat: 42.858279,
          lng: -70.930498,
          draggable: false,
          people:[{name:"James"},{name:"Jack"}],
          messages:[{
            displayName:"James",
            email:"JamesScott96@live.co.uk",
            message:"g",
            timestamp:149541808471
          },
            {
              displayName:"James",
              email:"JamesScott96@live.co.uk",
              message:"g",
              timestamp:149541808471
            }],
          type:"gardenings"
        }
      ];

      localStorage.setItem('markers', JSON.stringify(markers));
    } else {
      console.log('Loading markers...');
    }
  }
}
