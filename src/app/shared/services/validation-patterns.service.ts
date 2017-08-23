import { Injectable } from '@angular/core';

@Injectable()
export class ValidationPatternsService {

  public username = /^[a-zA-Z0-9]+$/;
  public email = /.+@.+\..+/i;
  public password = /^[a-zA-Z0-9]+$/;

}
