import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertComponent } from 'ngx-bootstrap/alert';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent 
{
  username: string = '';
  repositories: any;
 project:any;
 pageSize: number = 10;
  selectedPage: number = 1;
  selectedOption:number=10;
  dropdownOptions: number[] = Array.from({ length: 100 }, (_, i) => i + 1);
  fetchLoading: boolean = false; 
  userNotFound: boolean = false;

  onSubmitt(page:string): void {
    
     this.pageSize=+page;
  
  }
 constructor(private _api: ApiService ){

  }
  
  get projectChunks(): any[][] {
    return this.chunkArray(this.project, this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array(Math.ceil(this.project.length / this.pageSize)).fill(0).map((x, i) => i);
  }

  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  changePage(page: number): void {
    this.selectedPage = page;
  }

  prevPage(): void {
    if (this.selectedPage > 0) {
      this.selectedPage--;
    }
  }

  nextPage(): void {
    if (this.selectedPage < this.totalPagesArray.length - 1) {
      this.selectedPage++;
    }
  }



  

  get visiblePages(): number[] {
    const startIndex = Math.max(1, this.selectedPage - 2);
    const endIndex = Math.min(startIndex + 4, this.totalPagesArray.length - 1);
    return this.totalPagesArray.slice(startIndex, endIndex + 1);
  }

  fetchRepositories() {
    this.fetchLoading = true; 

    if (this.username.trim() !== '') {
      this._api.getUser(this.username).subscribe(
        (repos: any) => {
          this.repositories = repos;
          if(this.repositories.public_repos<=100){
            console.log(this.repositories.public_repos);
            this.dropdownOptions=Array.from({ length: this.repositories.public_repos }, (_, i) => i + 1);
          }
          this.fetchLoading = false; 
          this.userNotFound = false; // Reset to false if user is found


        },
        (error) => {
          this.userNotFound = true; 

          console.error("Error for fetching repositoris"+error);
          this.fetchLoading = false; 

        }
      );
    }
    
  }
  searchRepositories() {
    if (this.username.trim() !== '') {
      this._api. getPublicRepositories(this.username).subscribe(
        (repos: any) => {
          this.project = repos;
        },
        (error) => {
          console.error(error);
          
        }
      );
    }
  }
}
