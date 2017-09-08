import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home.component';
import {AllPositionComponent} from "./components/allPosition/all-position.component";
import {WatchListComponent} from "./components/watchList/watch-list.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/position', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'position', component: AllPositionComponent },
  { path: 'watchList', component: WatchListComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
