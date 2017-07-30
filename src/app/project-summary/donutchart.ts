import {ChartModule} from 'primeng/primeng';

export class DonutChart {

  data: any;

  constructor( Money:number,MoneyOutstanding:number ,Time:number,TimeOutstanding:number,Materials:number,MaterialsOutstanding:number) {
    this.data = {
      labels: ['Money','Money Outstanding' ,'Time',"Time Outstanding",'Materials', 'Materials Outstanding'],
      datasets: [
        {
          data: [Money,MaterialsOutstanding, Time,TimeOutstanding, Materials,MaterialsOutstanding],
          backgroundColor: [
            "#FF6384",
            "#FF7495",
            "#36A2EB",
            "#47B3EB",
            "#FFCE56",
            "#FFDF67"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#FF7495",
            "#36A2EB",
            "#47B3EB",
            "#FFCE56",
            "#FFDF67"
          ]
        }]
    };
  }


}
