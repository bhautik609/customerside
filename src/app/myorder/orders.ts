export class orders {
    public constructor(
      public order_id: number,
      public bill_date: string,
      public order_amt: number,
      public order_payment: string,
      public order_spc_instruction: string,
      public fk_u_EmailId: string,
      public u_EmailId?: string,
      public u_Name?:string,
      public fk_order_id ?:number,
      public fk_pro_id ?:number,
      public pro_name ?:string,
      public price ?:number,
    public pro_price ?: number,
    public pro_info?:string,
      public od_id ?:number,
      public qty ?:number,
      public detail_id ?: number,
      public date ?: string,
      public DelID?:string,
      public pro_img?:string,
      public track_id?:number,
      public status?:string,
      public fk_detail_id?:string,
      public cart_detail_id?:number,
    ) { }
  }
  