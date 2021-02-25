import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component'
import { CreatePageComponent } from './create-page/create-page.component'
import { EditPageComponent } from './edit-page/edit-page.component'
import { SharedModule } from '../shared/shared.module'
import { AuthGuard } from './shared/services/auth.guard'
import { LoginGuard } from './shared/services/login.guard'
import { SearchPipe } from './shared/search.pipe'
import { AlertComponent } from './shared/components/alert/alert.component'
import { AlertService } from './shared/services/alert.service'

const routers = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
      { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
      { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
      { path: 'post/:id', component: EditPageComponent, canActivate: [AuthGuard] },
    ],
  },
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard, AlertService],
})
export class AdminModule {}
