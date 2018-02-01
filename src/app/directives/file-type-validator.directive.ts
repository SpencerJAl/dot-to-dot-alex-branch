import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appFileTypeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: FileTypeValidatorDirective, multi: true
    }
  ]
})
export class FileTypeValidatorDirective implements Validator {

  static validate(c: FormControl): { [key: string]: any } {
    if (c.value) {
      if (c.value[0]) {
        return FileTypeValidatorDirective.checkExtension(c);
      };
    }
  }

  private static checkExtension(c: FormControl) {
    let valToLower = c.value[0].name.toLowerCase();
    let regex = new RegExp('(.*?)\.(jpg|png|jpeg|gif)$'); //add or remove required extensions here
    let regexTest = regex.test(valToLower);
    console.log('checking extentions');
    return !regexTest ? { 'notSupportedFileType': true } : null;
  }

  validate(c: FormControl): { [key: string]: any } {
    return FileTypeValidatorDirective.validate(c);
  }

}
