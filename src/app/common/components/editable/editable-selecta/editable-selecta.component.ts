import { Component, OnInit, Input } from '@angular/core';
import { EditableComponent } from '../editable-component';

@Component({
  selector: 'bwm-editable-selecta',
  templateUrl: './editable-selecta.component.html',
  styleUrls: ['./editable-selecta.component.scss']
})
export class EditableSelectaComponent extends EditableComponent {
  @Input() options: any[];
}
