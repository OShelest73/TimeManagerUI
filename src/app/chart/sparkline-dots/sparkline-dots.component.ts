import { Component, Input } from "@angular/core";
import { Point } from "../shared";

@Component({
  selector: 'svg:g[app-sparkline-dots]',
  templateUrl: './sparkline-dots.component.html',
  styleUrls: ['./sparkline-dots.component.css']
})
export class SparklineDotsComponent {
  @Input() points: Point[] = [];
}
