import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';



@Injectable()
export class AuthenticatedGuard implements CanActivate {

    async canActivate(): Promise<boolean> {
        return true;
    }
}