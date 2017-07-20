import {OnInit, Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {AF} from "../providers/af";
import {FirebaseObjectObservable, AngularFireDatabase} from "angularfire2/database";
/**
 * Created by James on 08/06/2017.
 */
@Component({
  selector: 'app-projectRequest',
  templateUrl: './projectRequest.component.html',
  styleUrls: ['./projectRequest.component.css']
})
export class ProjectRequestComponent implements OnInit {

  id:string;
  project: FirebaseObjectObservable<any>;
  proj;



  constructor(private afService: AF,private af:AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.project=af.object('projectRequests/'+ this.route.snapshot.params['id']);

    this.project.subscribe((p)=>{
      this.proj=p;
    });
  }

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
    console.log("params are" +this.id);
  }

  approve(){
    alert("approved");
    console.log("thing being passed name is " + this.proj);

    this.afService.projectApprove(this.proj, this.id).then(()=>{
      this.router.navigate(['/adminDashboard']);
    });
  }

  decline(){
    alert("declined");
    this.afService.projectDecline(this.id).then(()=>{
      this.router.navigate(['/adminDashboard']);
    });
  }

  test(){
    alert("The project is " + this.proj.name);
  }

}
