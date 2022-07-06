@nearBindgen
export class citizn {
  public citiznId:string;
  elected: string ;
  constructor(elected:string, citiznRId: string)
  {
    this.elected =elected;
    this.citiznId = citiznRId
  }
}