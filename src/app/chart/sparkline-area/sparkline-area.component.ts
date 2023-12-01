import { Component, Input } from "@angular/core";
import { Point } from "../shared";
import { getPathCommandsForPolygon } from "src/app/chartUtils";


@Component({
  selector: 'svg:g[app-sparkline-area]',
  templateUrl: './sparkline-area.component.html',
  styleUrls: ['./sparkline-area.component.css']
})
export class SparklineAreaComponent {
  d: string = "";

  @Input() set points(points: Point[]) {
    this.d = getPathCommandsForPolygon(points);
  }
}
