import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DataService } from "../../services/data.service";

import { Session } from "../../entity/Session";

import * as moment from "moment";
let now = moment().format("LLLL");

import "node_modules/chart.js/src/chart.js";
import "node_modules/chartjs-plugin-zoom/chartjs-plugin-zoom.js";
import "node_modules/hammerjs/hammer.min.js";

@Component({
  selector: "app-session-details",
  templateUrl: "./session-details.component.html",
  styleUrls: ["./session-details.component.css"]
})
export class SessionDetailsComponent implements OnInit {
  session: Session; // TODO call new Session and actually write a default constructor for it *********************
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";
  public lineChartLabels: Array<any>;
  public lineChartData: Array<any> = [
    {
      data: [],
      label: "Test Data"
    },
    {
      data: [],
      label: "Test Data"
    },
    {
      data: [],
      label: "Test Data"
    },
    {
      data: [],
      label: "Test Data"
    }
  ];
  public lineChartOptions: any = {
    title: {
      display: true,
      text: "Raw and Linerly Scaled Data"
    },
    scales: {
      xAxes: [
        {
          position: "bottom",
          type: "time",
          time: {
            min: new Date("2018-05-15T18:26:00.00"), // TODO Make this not hardcoded
            max: new Date("2018-05-15T18:26:40.00") // TODO Make this not hardcoded
          },
          gridLines: {
            zeroLineColor: "rgba(0,255,0,1)"
          },
          scaleLabel: {
            display: true,
            labelString: "x axis"
          },
          ticks: {
            beginAtZero: true,
            source: "auto"
          }
        }
      ],
      yAxes: [
        {
          position: "left",
          type: "linear",
          gridLines: {
            zeroLineColor: "rgba(0,255,0,1)"
          },
          scaleLabel: {
            display: true,
            labelString: "y axis"
          },
          ticks: {
            beginAtZero: true,
            min: -60, // TODO Make this not hardcoded
            max: 250 // TODO Make this not hardcoded
          }
        }
      ]
    },
    pan: {
      enabled: true,
      mode: "x"
    },
    zoom: {
      enabled: true,
      mode: "x",
      limits: {
        max: 10,
        min: 0.5
      }
    }
  };
  public lineChartColors: Array<any> = [
    {
      // Force Raw
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // Force Adj
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      // Angle Raw
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      // Angle Adj
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      pointBackgroundColor: "rgba(77,83,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    }
  ];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log("SessionDetailsComponent.ngOnInit() called")

    this.getSessionDetails();
  }

  getSessionDetails() {
    const id = this.route.snapshot.paramMap.get("_id");
    this.dataService.getSessionDetails(id).subscribe((data: Session) => {
      this.session = data;
      console.log(this.session);
    });
  }

  public setChart(): void {
    let _lineChartData: Array<any> = new Array(4);

    _lineChartData[0] = {
      data: new Array(this.session.ts.length),
      label: "Raw Force"
    };
    _lineChartData[1] = {
      data: new Array(this.session.ts.length),
      label: "Scaled Force"
    };
    _lineChartData[2] = {
      data: new Array(this.session.ts.length),
      label: "Raw Angle"
    };
    _lineChartData[3] = {
      data: new Array(this.session.ts.length),
      label: "Scaled Angle"
    };

    // for Raw Force
    for (let i = 0; i < _lineChartData[0].data.length; i++) {
      _lineChartData[0].data[i] = {
        t: new Date(this.session.ts[i]),
        y: this.session.force_raw[i]
      };
    }
    // for Scaled Force
    for (let i = 0; i < _lineChartData[1].data.length; i++) {
      _lineChartData[1].data[i] = {
        t: new Date(this.session.ts[i]),
        y: this.session.force_adj[i]
      };
    }
    // for Raw Angle
    for (let i = 0; i < _lineChartData[2].data.length; i++) {
      _lineChartData[2].data[i] = {
        t: new Date(this.session.ts[i]),
        y: this.session.angle_raw[i]
      };
    }
    // for Raw Angle
    for (let i = 0; i < _lineChartData[3].data.length; i++) {
      _lineChartData[3].data[i] = {
        t: new Date(this.session.ts[i]),
        y: this.session.angle_adj[i]
      };
    }

    this.lineChartData = _lineChartData;
    this.lineChartLabels = this.session.ts;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
