import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  foo: Foo;
  name: string;

  constructor(
    private fooService: FooService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.foo = new Foo(null, this.name);
    console.log(this.name);
    
    this.fooService.create(this.foo)
      .subscribe(
        data=> {
          console.log(data);
          this.gotoList();
        },
        err => console.log(err)
      );
  }

  gotoList(): void {
    this.router.navigate(['/list']);
  }


}
