import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.omponent';
import { ContactComponent } from './contact/contact.omponent';
import { NotesComponent } from './notes/notes.omponent';

export const routes: Routes = [
    {
        component: AboutComponent,
        path: "about"
    },
    {
        component: ContactComponent,
        path: "contact"
    },
    {
        component: NotesComponent,
        path: "notes"
    }
];
