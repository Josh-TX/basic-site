import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.omponent';
import { ContactComponent } from './contact/contact.omponent';

export const routes: Routes = [
    {
        component: AboutComponent,
        path: "about"
    },
    {
        component: ContactComponent,
        path: "contact"
    }
];
