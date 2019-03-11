import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditableSelectaComponent } from './editable-selecta/editable-selecta.component';
import { EditableImageComponent } from './editable-image/editable-image.component';
import { ImageUploadModule } from '../image-upload/image-upload.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ImageUploadModule
  ],
  exports: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectaComponent,
    EditableImageComponent
  ],
  declarations: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectaComponent,
    EditableImageComponent
  ]  
}) 
export class EditableModule {}