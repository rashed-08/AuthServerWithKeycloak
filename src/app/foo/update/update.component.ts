import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-udpate',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UdpateComponent implements OnInit {

  foo: Foo;

  constructor(
    private fooService: FooService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fooService.details(id)
      .subscribe(
        data => {
          this.foo = data;
        },
        err => console.log(err)
      )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fooService.update(id, this.foo)
      .subscribe(
        data => {
          console.log(data);
          this.gotoList();
        },
        err => console.log(err)
        
      )
  }

  gotoList(): void {
    this.router.navigate(['/list']);
  }

}
