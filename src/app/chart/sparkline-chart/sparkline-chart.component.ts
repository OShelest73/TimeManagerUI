/*import { Component, Input, HostBinding } from "@angular/core";
import { Point } from "./shared";
import { getBounds, createLinearScale } from ".";

@Component({
  selector: 'app-sparkline-chart',
  templateUrl: './sparkline-chart.component.html',
  styleUrls: ['./sparkline-chart.component.css']
})
export class SparklineChartComponent {
  margin = 10;
  width = 500;
  height = 120;
  computedPoints: Point[];

  @HostBinding("style.width.px") get containerWidth() {
    return this.width - this.margin * 2;
  }

  @HostBinding("style.height.px") get containerHeight() {
    return this.height - this.margin * 2;
  }

  @Input() set points(points: Point[]) {
    const { margin, width, height } = this;
    const bounds = getBounds(points);
    const scaleX = createLinearScale(
      [bounds.minX, bounds.maxX],
      [margin, width - margin]
    );
    const scaleY = createLinearScale(
      [bounds.minY, bounds.maxY],
      [height - margin, margin]
    );

    this.computedPoints = points.map(point => {
      return {
        tooltip: point.tooltip,
        x: scaleX(point.x),
        y: scaleY(point.y)
      };
    });
  }
}
*/