import { Injectable } from "@angular/core";

import { DataSource } from '../domain/datasource.model';

@Injectable()
export class SettingService {

    private formats: string[];
    private formatsReq: string[];
    private dataSource: string[] = [];

    constructor() {
        this.formats = [
        'CSV',
        'TSV',
        'XLSX',
        'XLS',
        'PDF',
        'XML',
        'KML',
        'GML',
        'HTML',
        'GEOJSON',
        'JSON',
        'ODT',
        'DOCX',
        'DOC',
        'RTF',
        'SHP',
        'JPEG',
        'PNG',
        'ZIP',
        'ODS',
        'DXF',
        'FLV',
        'DWG',
        'DGN',
        'ODP',
        '3DM',
        'XSL',
        'TAB',
        'GTFS',
        'LAZ'
    ];
    this.formatsReq = [
        'CSV',
        'TSV',
        'XLSX',
        'XLS',
        'PDF',
        'XML',
        'KML',
        'GML',
        'HTML',
        'GEOJSON',
        'JSON',
        'ODT',
        'DOCX',
        'DOC',
        'RTF',
        'SHP',
        'JPEG',
        'PNG',
        'ZIP',
        'ODS',
        'DXF',
        'FLV',
        'DWG',
        'DGN',
        'ODP',
        '3DM',
        'XSL',
        'TAB',
        'GTFS',
        'LAZ'
    ];
    }

    getFormats(): string[] {
        return this.formatsReq;
    }

    getFormatsRef(): string[] {
        return this.formats;
    }

    getDataSource(): string[] {
        return this.dataSource;
    }

    addDataSource(source: string) {
        this.dataSource.push(source);
    }

    addFormat(format: string) {
        this.formatsReq.push(format);
    }

    removeDataSource(source: string) {
        let index = this.dataSource.indexOf(source);

        if (index  >= 0) {
            this.dataSource.splice(index, 1);
        }
    }

    removeFormat(format: string) {
        let index = this.formatsReq.indexOf(format.toUpperCase());

        if (index >= 0) {
            this.formatsReq.splice(index, 1);
        }
    }
}
