import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(stars: number): number[] {
    if (stars == null || isNaN(stars) || stars < 0) {
      return [];
    }
    const fullStars = Math.floor(stars); 
    const hasHalfStar = stars % 1 !== 0;
    const halfStarsArray = Array(fullStars).fill(0).concat(0.5);
    const fullStarsArray = Array(fullStars).fill(0)    
    return hasHalfStar ?  halfStarsArray : fullStarsArray
  }

}
