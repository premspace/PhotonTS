import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
const appRoutes = [
    {path:"login", component:LoginComponent},
];
@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class LoginRoutingModule{}
