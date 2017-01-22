import { Injectable } from "@angular/core";


@Injectable()
export class LabelService {

    getClassForFileType(type: string) {
         if (["odt", "rtf", "doc", "docx"].indexOf(type) >= 0) {
            return "label-info";
        } else if (["xlsx", "xls", "csv", "tsv", "shp"].indexOf(type) >= 0) {
            return "label-success";
        } else if (["json", "geojson"].indexOf(type) >= 0) {
            return "label-warning";
        } else if (["pdf"].indexOf(type) >= 0) {
            return "label-danger";
        } else {
            return "";
        }
    }
}
