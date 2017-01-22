import { setTimeout } from 'timers';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

declare var CodeMirror: any;
declare var document: any;

@Component({
    selector: 'code-viewer',
    templateUrl: './code-viewer.template.html'
})
export class CodeViewerComponent implements OnChanges {
    @Input("code") code: string;
    @Input("mode") mode: string;
    @Input("readOnly") readOnly: boolean;

    private codeMirrorEditor;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.codeMirrorEditor) {
            this.codeMirrorEditor = CodeMirror(function (elt) {
                document.getElementById("code-editor").parentNode.replaceChild(elt, document.getElementById("code-editor"));
            }, {
                    mode: this.mode,
                    value: this.code,
                    readOnly: this.readOnly,
                    lineNumbers: true
                });
            console.log(this.mode);
            setTimeout(() => {
                this.codeMirrorEditor.refresh();
            }, 100);

        }
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (!this.codeMirrorEditor) {
        //     this.codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        //         mode: this.mode,
        //         value: `
        //             {
        //                 id: 'caca2',
        //                 name: 'Quebec'
        //             }
        //         `
        //     });
        // }
        // if (changes["code"]) {
        //     this.codeMirrorEditor.setValue(this.code);
        //     setTimeout(() => {
        //         this.codeMirrorEditor.refresh();
        //     }, 1);
        // }
    }
}
