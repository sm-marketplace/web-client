import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: FileUpload;

  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  
    this.form = this.fb.group({
      'name': [
        { value: '', disabled: false },
        [ Validators.required ]
      ],
      'price': [
        { value: '', disabled: false },
        [ Validators.required ]
      ],
      'description': [
        { value: '', disabled: false },
        [ Validators.required ]
      ],
    });
  }

  onSubmit() {
    const file: File = this.fileInput.files[0];

    const value = {
      ...this.form.value,
      file,
    }
    
    console.log({value});
    
    return value;
  }
}
