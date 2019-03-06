import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditableSelectaComponent } from './editable-selecta/editable-selecta.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule
  ],
  exports: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectaComponent
  ],
  declarations: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectaComponent
  ]  
}) 
export class EditableModule {}