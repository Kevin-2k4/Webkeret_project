import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ConcertTableDataSource, ConcertTableItem } from './concert-table-datasource';

@Component({
  selector: 'app-concert-table',
  templateUrl: './concert-table.component.html',
  styleUrl: './concert-table.component.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class ConcertTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ConcertTableItem>;
  dataSource = new ConcertTableDataSource();

  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
