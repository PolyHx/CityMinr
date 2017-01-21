import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';



@Injectable()
export class AdminGuard implements CanActivate {

    async canActivate(): Promise<boolean> {
        return true;
    }
}