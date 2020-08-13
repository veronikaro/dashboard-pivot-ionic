import React, { Component } from "react";
import { IonApp } from "@ionic/react";
import * as FlexmonsterReact from "react-flexmonster";

export default class App extends Component {
  private flexmonsterRef: any;
  private flexmonsterChartsRef: any;

  constructor(props: any) {
    super(props);
    this.flexmonsterRef = React.createRef<FlexmonsterReact.Pivot>();
    this.flexmonsterChartsRef = React.createRef<FlexmonsterReact.Pivot>();
  }

  onReady(): void {
    var pivotObject = this.flexmonsterRef.current as FlexmonsterReact.Pivot;
    var report = {
      dataSource: {
        type: "csv",
        filename: "./assets/data.csv",
        mapping: {
          geo_type: {
            type: "string",
            caption: "Geo Type",
          },
          region: {
            type: "string",
            caption: "Region",
          },
          transportation_type: {
            type: "string",
            caption: "Transportation Type",
          },
          date: {
            type: "date",
            caption: "Date",
          },
          value: {
            type: "number",
            caption: "Value",
          },
        },
      },
      slice: {
        rows: [
          {
            uniqueName: "region",
          },
        ],
        columns: [
          {
            uniqueName: "date.Month",
          },
          {
            uniqueName: "[Measures]",
          },
        ],
        measures: [
          {
            uniqueName: "value",
            aggregation: "average",
            format: "-1ck4eom7ovbe00",
          },
        ],
      },
      formats: [
        {
          name: "-1ck4eom7ovbe00",
          decimalPlaces: 2,
        },
      ],
    };
    pivotObject.flexmonster.setReport(report);
  }

  onChartReady(): void {
    var pivotObject = this.flexmonsterChartsRef
      .current as FlexmonsterReact.Pivot;
    var report = {
      dataSource: {
        type: "csv",
        filename: "./assets/data.csv",
        mapping: {
          geo_type: {
            type: "string",
            caption: "Geo Type",
          },
          region: {
            type: "string",
            caption: "Region",
          },
          transportation_type: {
            type: "string",
            caption: "Transportation Type",
          },
          date: {
            type: "date",
            caption: "Date",
          },
          value: {
            type: "number",
            caption: "Value",
          },
        },
      },
      slice: {
        rows: [
          {
            uniqueName: "region",
            filter: {
              measure: {
                uniqueName: "value",
                aggregation: "average",
              },
              query: {
                top: 10,
              },
            },
          },
        ],
        columns: [
          {
            uniqueName: "transportation_type",
          },
          {
            uniqueName: "[Measures]",
          },
        ],
        measures: [
          {
            uniqueName: "value",
            aggregation: "average",
            format: "-1ck4eom7ovbe00",
          },
        ],
      },
      options: {
        viewType: "charts",
        chart: {
          type: "stacked_column",
        },
      },
    };
    pivotObject.flexmonster.setReport(report);
  }

  render = () => {
    return (
      <IonApp>
        <FlexmonsterReact.Pivot
          ref={this.flexmonsterRef}
          toolbar={true}
          width="100%"
          ready={() => this.onReady()}
        />
        <FlexmonsterReact.Pivot
          ref={this.flexmonsterChartsRef}
          toolbar={true}
          width="100%"
          ready={() => this.onChartReady()}
        />
      </IonApp>
    );
  };
}
