import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageUploadService } from './image-upload.service';

class FileSnippet {
  static readonly IMAGE_SIZE = {width: 750, height: 422};
  public pending: boolean = false;
  public status: string = 'INIT';

  constructor(public src: string, public file: File) {

  }
} 

@Component({
  selector: 'bwm-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();
  @Output() imageLoadedToContainer = new EventEmitter();
  @Output() croppingCancel = new EventEmitter();

  selectedFile: FileSnippet;
  imageChangedEvent: any = '';

  constructor(private imageUploadService: ImageUploadService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  private onSuccess(imageUrl: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'OK';
    this.imageChangedEvent = null;
    this.imageUploaded.emit(imageUrl);
  }

  private onFailure() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'FAIL';
    this.imageChangedEvent = null;
    this.imageError.emit('');
  }

  imageCropped(file: File): FileSnippet | File {
    if(this.selectedFile) {
      return this.selectedFile.file = file;
    }
    return this.selectedFile = new FileSnippet('', file);
  }

  imageLoaded() {
    this.imageLoadedToContainer.emit();
  }

  cancelCropping() {
    this.imageChangedEvent = null;
    this.croppingCancel.emit();
  }

  processFile(event: any) {
    this.selectedFile = undefined;

    const URL = window.URL;
    let file, img;
    file = event.target.files[0];
    if(file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      img = new Image();

      const self = this;
      img.onload = function() {
        if(this.width > FileSnippet.IMAGE_SIZE.width && this.height > FileSnippet.IMAGE_SIZE.height) {
          self.imageChangedEvent = event;
        } else {
          // Handle error
          this.toastr.error(`minimum width is ${FileSnippet.IMAGE_SIZE.width} and minimum height is ${FileSnippet.IMAGE_SIZE.height}`, 'Error');
        }
      }
      img.src = URL.createObjectURL(file);
    } else {
      // Handle error
      this.toastr.error('Unsupported file type, only png and jpeg are supported', 'Error');
    }
  }

  uploadImage() {
   if(this.selectedFile) {
      // const file: File = imageInput.files[0];
    const reader = new FileReader();
    
    reader.addEventListener('load', (event: any) => {
      this.selectedFile.src = event.target.result;
      // this.selectedFile = new FileSnippet(event.target.result, file);
      this.selectedFile.pending = true;

      this.imageUploadService.uploadImage(this.selectedFile.file).subscribe(
        (imageUrl: any) => {
          this.onSuccess(imageUrl);
        },
        (errorResponse: HttpErrorResponse) => {
          this.toastr.error(errorResponse.error.error[0].details, 'Error');
          this.onFailure();
        }
      );
    });
    reader.readAsDataURL(this.selectedFile.file);
   }
  }

}
