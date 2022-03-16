import _ from "lodash";
import { Widget, WidgetTemplate } from "../../models";

export const GetOutOfMyWay = (widget: Widget, widgets: Widget[]): Widget[] => {
  let movers = _.cloneDeep(widgets)
    .filter(w => w.id !== widget.id && w.y + w.height > widget.y)
    .sort((w1: Widget, w2: Widget) => w1.y - w2.y);

  let xMin = widget.x;
  let xMax = widget.x + widget.width;
  let yMax = widget.y + widget.height;

  movers.forEach((w: Widget) => {
    let toMove = false;
    if (w.x + w.width > xMin && w.x < xMax) {
      toMove = true;
    }
    if (toMove && w.y <= yMax) {
      let yOffset = widget.y + widget.height - w.y;
      if (!(yOffset <= 0)) {
        w.y += yOffset;
        movers = GetOutOfMyWay(w, movers).concat(movers.filter(w1 => !movers.some(w2 => w2.id === w1.id)))
      }
    }
  });

  return movers.concat(widgets.filter(w1 => !movers.some(w2 => w2.id === w1.id)));
}

export const GuardTypeWidget = (arg: any): arg is Widget => {
  if (!arg) {
    return false;
  }
  if (!arg.id || typeof(arg.id) !== "string") {
    return false;
  }
  if (!arg.templateId || typeof(arg.templateId) !== "string") {
    return false;
  }
  if (!arg.code || typeof(arg.code) !== "string") {
    return false;
  }
  if (!arg.width || typeof(arg.width) !== "number") {
    return false;
  }
  if (!arg.height || typeof(arg.height) !== "number") {
    return false;
  }
  if (!arg.x || typeof(arg.x) !== "number") {
    return false;
  }
  if (!arg.y || typeof(arg.y) !== "number") {
    return false;
  }
  return true;
}

export const GuardTypeWidgetTemplate = (arg: any): arg is WidgetTemplate => {
  if (!arg) {
    return false;
  }
  if (!arg.id || typeof(arg.id) !== "string") {
    return false;
  }
  if (arg.templateId != null) {
    return false;
  }
  if (!arg.code || typeof(arg.code) !== "string") {
    return false;
  }
  if (!arg.width || typeof(arg.width) !== "number") {
    return false;
  }
  if (!arg.height || typeof(arg.height) !== "number") {
    return false;
  }
  if (arg.x != null) {
    return false;
  }
  if (arg.y != null) {
    return false;
  }
  return true;
}