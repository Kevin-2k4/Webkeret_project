import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface ConcertTableItem {
  name: string;
  id: number;
}

const EXAMPLE_DATA: ConcertTableItem[] = [
  {id: 1, name: 'Guns N Roses'},
  {id: 2, name: 'AC/DC'},
  {id: 3, name: 'Nirvana '},
  {id: 4, name: 'Metallica'},
  {id: 5, name: 'Iron Maiden'},
];


export class ConcertTableDataSource extends DataSource<ConcertTableItem> {
  data: ConcertTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

 
  connect(): Observable<ConcertTableItem[]> {
    if (this.paginator && this.sort) {
      
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  
  disconnect(): void {}

  
  private getPagedData(data: ConcertTableItem[]): ConcertTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

 
  private getSortedData(data: ConcertTableItem[]): ConcertTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
