import { Component, Input } from "@angular/core";
import { Point } from "../shared";
import { getPathCommandsForLine } from "src/app/chartUtils";

@Component({
  selector: 'svg:g[app-sparkline-line]',
  templateUrl: './sparkline-line.component.html',
  styleUrls: ['./sparkline-line.component.css']
})
export class SparklineLineComponent {
  d: string = "";

  @Input() set points(points: Point[]) {
    this.d = getPathCommandsForLine(points);
  }
}
