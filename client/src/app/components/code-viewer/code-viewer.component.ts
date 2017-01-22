import { setTimeout } from 'timers';
import { Component, EventEmitter, Input, DoCheck, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

declare var CodeMirror: any;
declare var document: any;

@Component({
    selector: 'code-viewer',
    templateUrl: './code-viewer.template.html'
})
export class CodeViewerComponent implements DoCheck {
    @Input("code") code: string;
    @Input("mode") mode: string;
    @Input("readOnly") readOnly: boolean;

    private codeMirrorEditor;
    private lastCode;
    private lastMode;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.codeMirrorEditor) {
            this.codeMirrorEditor = CodeMirror(function (elt) {
                document.getElementById("code-editor").parentNode.replaceChild(elt, document.getElementById("code-editor"));
            }, {
                    mode: 'text',
                    value: this.code,
                    readOnly: this.readOnly,
                    lineNumbers: true,
                    lineWrapping: true
                });
            setTimeout(() => {
                this.codeMirrorEditor.refresh();
            }, 100);

        }
    }

    ngDoCheck() {
        if (this.code != this.lastCode && this.code && this.codeMirrorEditor) {
            this.codeMirrorEditor.setValue(this.code);
            this.codeMirrorEditor.setOption('mode', this.mode);
            setTimeout(() => {
                this.codeMirrorEditor.refresh();
            }, 100);
        }
    }
}
