import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule
],
    exports: [
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule
]
})
export class MaterialModule {}
