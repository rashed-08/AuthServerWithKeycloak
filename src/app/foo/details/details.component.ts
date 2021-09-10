import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  foo: Foo;

  constructor(private fooService: FooService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    console.log('param: ', this.activatedRoute.snapshot.params);
    
    this.fooService.details(id)
      .subscribe(
        data => {
          this.foo = data;
        },
        err => console.log(err)
      );
    
    // this.getFoo(id);
  }

  // public getFoo(id: number) {
  //   console.log('working: ', id);
    
  //   return this.fooService.details(id)
  //     .subscribe(
  //       data => {
  //         this.foo = data;
  //       },
  //       err => console.log(err)
  //     );
  // }

  gotoList(): void {
    this.router.navigate(['/list']);
  }

}
