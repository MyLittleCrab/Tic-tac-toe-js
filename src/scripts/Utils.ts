export default class Utils{
    
    public static objComparator(obj1: object, obj2: object): boolean{
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    public static arrayIncludes(array: Array<object>, object: object): boolean{
        for (const el of array){
            if (this.objComparator(el, object)){
                return true;
            }
        }
        return false;
    }

    public static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}