export class product{
    constructor(public product_id  :number,public product_name:string,public product_color:string,public product_mfd:string,public product_price:number,public product_warr:number,public product_garr:number,public product_desc:string,public product_img1:string,public cat_id_fk?:number,public cat_id?:number,public cat_name?:string){}
}