import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rejectreason',
  templateUrl: './rejectreason.component.html',
  styleUrls: ['./rejectreason.component.css']
})
export class RejectreasonComponent implements OnInit {

  @Input()
  open: Boolean = false;
  @Output()
  closereason = new EventEmitter<Boolean>();
  constructor(private fb: FormBuilder) { }
  reasonForm!: FormGroup;
  isSubmitted: Boolean = false;
  ngOnInit(): void {
    this.reasonForm = this.fb.group(
      {
        reason: ["",
          [
            Validators.required
          ]
        ],
      })
  }
  closemodal(): void {
    this.open = !this.open
    this.closereason.emit(false);
  }
  submitreason(): void {
    this.isSubmitted = true;
    console.log(this.reasonForm.valid, this.reasondata)
    if (this.reasonForm.valid) {
      this.open = !this.open
      this.closereason.emit(false);
    }
  }
  get reasondata() {
    return this.reasonForm.get("reason");
  }
}
