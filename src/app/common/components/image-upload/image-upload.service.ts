
import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageUploadService {

    constructor(private http: HttpClient) {}

    public uploadImage(image: any): Observable<string | any> {
        const formData = new FormData();
        formData.append('image', image);

        return this.http.post('/api/v1/image-upload', formData).pipe(
            map(((json: any) => json.imageUrl)));
    } 
}