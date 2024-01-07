/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, NgFor, AsyncPipe],
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  #httpClient = inject(HttpClient);

  versions$: Observable<string> = this.#getRootDirectoryGithub().pipe(
    this.#getVersionsFolder(),
    filter((x) => !!x),
    this.#getVersionsDirectoryGithub(),
    map((x) => x.tree.map((i: any) => i.path))
  );

  #getVersionsDirectoryGithub() {
    return switchMap((x: any) => this.#httpClient.get<any>(x.url));
  }

  #getVersionsFolder() {
    return map((x: any) =>
      x.tree.find((i: { path: string }) => i.path === 'versions')
    );
  }

  #getRootDirectoryGithub() {
    return this.#httpClient.get<any>(
      `https://api.github.com/repos/${ghOrganisation}/${repoName}/git/trees/${branch}`
    );
  }
}

const ghOrganisation = 'LaurenzDemey';
const repoName = 'setup-ui-lib-with-docs';
const branch = 'gh-pages';
