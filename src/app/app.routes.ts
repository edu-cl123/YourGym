import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { PriceComponent } from './pages/price/price.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationsComponent } from './pages/registrations/registrations.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateFormComponent } from './pages/registrations/create-form/create-form.component';
import { CreateUserComponent } from './pages/profile/create-user/create-user.component';


export const routes: Routes = [
    { path: '', component: IndexComponent }, // Ruta por defecto
    { path: 'about', component: AboutComponent },
    { path: 'price', component: PriceComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'registrations', component: RegistrationsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateFormComponent },
    { path: 'createUser', component: CreateUserComponent },


];

  export class AppRoutingModule { }