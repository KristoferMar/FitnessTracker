import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatrialModule } from '../materials.module';
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatrialModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatrialModule,
        FlexLayoutModule,
    ]
})
export class SharedModule { }