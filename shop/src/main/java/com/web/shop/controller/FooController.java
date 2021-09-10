package com.web.shop.controller;

import com.web.shop.dto.ResponseMessage;
import com.web.shop.model.Foo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/foo")
@CrossOrigin
public class FooController {
    List<Foo> foos = Stream.of(
            new Foo(1, "foo 1"),
            new Foo(2, "foo 2"),
            new Foo(3, "foo 3")
    ).collect(Collectors.toList());

    @GetMapping
    @RolesAllowed("backend-user")
    public ResponseEntity<List<Foo>> getAllFoo() {
        return ResponseEntity.ok(foos);
    }

    @GetMapping("/details/{id}")
    @RolesAllowed("backend-user")
    public ResponseEntity<Foo> details(@PathVariable int id) {
        Foo foo = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        return new ResponseEntity(foo, HttpStatus.OK);
    }

    @PostMapping
    @RolesAllowed("backend-admin")
    public ResponseEntity<?> create(@RequestBody Foo foo) {
        int maxIndex = foos.stream().max(Comparator.comparing(m -> m.getId())).get().getId();
        foo.setId(maxIndex + 1);
        foos.add(foo);
        return new ResponseEntity<>(new ResponseMessage("created"), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @RolesAllowed("backend-admin")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Foo foo) {
        Foo fooUpdate = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        fooUpdate.setName(foo.getName());
        return new ResponseEntity(new ResponseMessage("updated"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @RolesAllowed("backend-admin")
    public ResponseEntity<?> delete(@PathVariable int id) {
        Foo foo = foos.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
        foos.remove(foo);
        return new ResponseEntity<>(new ResponseMessage("deleted"), HttpStatus.OK);
    }
}
