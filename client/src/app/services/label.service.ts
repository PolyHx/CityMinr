import { Injectable } from "@angular/core";


@Injectable()
export class LabelService {

    getClassForFileType(type: string) {
         if (["ODT", "RTF", "DOC", "DOCX"].indexOf(type) >= 0) {
            return "label-info";
        } else if (["XLSX", "XLS", "CSV", "TSV", "SHP"].indexOf(type) >= 0) {
            return "label-success";
        } else if (["JSON", "GEOJSON"].indexOf(type) >= 0) {
            return "label-warning";
        } else if (["PDF"].indexOf(type) >= 0) {
            return "label-danger";
        } else {
            return "";
        }
    }
}
