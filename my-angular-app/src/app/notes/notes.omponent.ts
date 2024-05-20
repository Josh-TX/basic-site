import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './notes.component.html',
})
export class NotesComponent {
    save(authKey: string = "") {
        var filename = "mydata.json";
        var data = JSON.stringify({ name: "josh" });
        console.log("hi")
        this.trySave(filename, data, authKey).then(res => {
            if (res.status == 401){
                var message = authKey 
                    ? "Failed to save: the provided AUTHKEY didn't work: Enter a new AUTHKEY" 
                    : "Failed to save: the server requires an AUTHKEY to save. Enter it below";
                var newAuthKey = prompt(message)
                if (newAuthKey){
                    this.save(newAuthKey);
                }
            }
        })
    }

    trySave(filename: string, data: string, secret: string): Promise<Response>{
        return window.fetch(`/save?filename=${encodeURIComponent(filename)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': secret
            },
            body: data
        })
    }

    load() {
        var filename = "mydata.json";
        window.fetch(`/load?filename=${encodeURIComponent(filename)}`)
            .then(z => z.text())
            .then(z => {
                console.log("result: ", z)
                alert("response was " + z)
            })
    }
}

