@nearBindgen
export class citizen {
  public citizenId:string;
  elected: string ;
  constructor(elected:string, citizenId: string)
  {
    this.elected =elected;
    this.citizenId = citizenId
  }
}