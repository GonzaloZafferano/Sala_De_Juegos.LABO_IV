import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent {

  constructor(private http: HttpClient) { }

  ruta: string = '';
  usuario: string = '';
  urlGit: string = '';
  cantidad: number = 0;
  spinner: boolean = false;

  ngOnInit() {
    this.spinner = true;
    this.http.get<any[]>(`https://api.github.com/users/GonzaloZafferano`).subscribe(
      (x: any) => {
        this.ruta = x.avatar_url;
        this.usuario = x.login;
        this.urlGit = x.html_url;
        this.cantidad = x.public_repos;
        this.spinner = false;
      },
    );
  }
}
