/**
 * Created by James on 22/05/2017.
 */
export class GetUsers{
  load(){
    if(localStorage.getItem('users') === null || localStorage.getItem('users') === undefined){
      console.log('No users found....creating...');

      var users = [
        {
          name:"James",
          age:21,
          hobbies:[{name:"gardening"},{name:"cooking"}],
          summary:"a software developer",
          description:"blah blab blah blah testing blan blah"
        },
        {
          name:"Catriona",
          age:12,
          hobbies:[{name:"gardening"},{ name:"gaming"},{name:"cooking"}],
          summary:"a fine gardener wanting to get into music",
          description:"blah blab blah blah testing blah want to get into music blah blah blah"

        },
        {
          name:"Josh",
          age:35,
          hobbies:[{name:"gardening"},{name:"gaming"}],
          summary:"a i like to play my guitar but i am getting into gardening",
          description:"blah blab blah blah testing blan blah testing"
        },
        {
          name:"Jack",
          age:27,
          hobbies: [{name:"cooking"} ],
          summary:"a head chef wanting to teach young people to cook well",
          description:"blah blab blah blah testing blan blah i like teaching people",
        }
      ];

      localStorage.setItem('users', JSON.stringify(users));
    } else {
      console.log('Loading users...');
    }
  }
}
