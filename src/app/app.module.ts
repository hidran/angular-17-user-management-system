import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { ThemeTogglerComponent } from './theme-toggler/theme-toggler.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeTogglerComponent,
    NavbarComponent,
    FooterComponent



  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule

  ]
})
export class AppModule { }
